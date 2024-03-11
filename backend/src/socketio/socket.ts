import { Server, Socket } from "socket.io";
import { TSocketMsg } from "../types/socketMsgs";
import { messageService } from "../service/messageService";
import { NextFunction } from "express";
import admin from "firebase-admin";
import "dotenv/config";

export class SocketService {
	private _io: Server;

	constructor() {
		// attach httpserver on instantiation
		this._io = new Server({
			cors: {
				origin: "http://localhost:5173",
				// origin:
				// 	process.env.NODE_ENV == "production" ? "*" : "http://localhost:5174",
			},
		});
		// this._initMongoAdaptor();
		this._initAuthMiddleware();
	}
	get io() {
		return this._io;
	}

	_initAuthMiddleware() {
		const io = this._io;

		// middleware to check authentication:
		io.use(async (socket: Socket, next: NextFunction) => {
			const accessToken = socket.handshake.auth.accessToken;
			// console.log("token", accessToken);
			// decode the accessToken(firebase)
			try {
				if (accessToken) {
					const decodedToken = await admin.auth().verifyIdToken(accessToken);
					const userId = decodedToken.uid;
					socket.userId = userId;
				} else {
					console.log("token not found");
					throw new Error("not authorised");
				}
				next();
			} catch (error) {
				next(error);
			}
		});
	}

	// _initMongoAdaptor() {
	// 	const io = this._io;
	// 	const db = mongoose.connection.db;

	// 	db.createCollection(COLLECTION, { capped: true, size: 1e6 })
	// 		.then(() => {
	// 			const mongoCollection = db.collection(COLLECTION);
	//             //@ts-ignore
	// 			io.adapter(createAdapter(mongoCollection));
	// 		})
	// 		.catch((err) => {
	// 			console.log(`error creating capped collection`);
	// 		});
	// }
	// _initMongoAdaptor() {
	// 	const io = this._io;
	// 	const mongoClient = new MongoClient(uri);
	// 	mongoClient.connect().then(() => {
	// 		console.log(`mongo client connected`);
	// 		mongoClient
	// 			.db("socketDB")
	// 			.createCollection(COLLECTION, {
	// 				capped: true,
	// 				size: 1e6,
	// 			})
	// 			.then(() => {
	// 				const mongoCollection = mongoClient
	// 					.db("socketDB")
	// 					.collection(COLLECTION);

	// 				io.adapter(createAdapter(mongoCollection));
	// 			});
	// 	});
	// }

	public initListeners() {
		const io = this._io;

		// on connection listeners
		io.on("connection", (socket) => {
			console.log(" client connected: ", socket.id);
			console.log("user uid", socket.userId);
			/* ---------------------- ROOM ------------------------------- */
			socket.on("join-room", (roomId, cb) => {
				socket.join(roomId);

				console.log(`room joined: ${roomId}` + `uid: ${socket.userId}`);

				// read all unread msgs for the user on joining room
				(async function () {
					const result = await messageService.readUnreadMsgs({
						chatId: roomId,
						userId: socket.userId,
					});
					// console.log("unread messages read!!!", result);
					// console.log(first)
					if (result.data.modifiedCount != 0) {
						cb(`msg read`);
					} else {
						cb("msg not read");
					}
				})();
				// cb("room joined");
			});

			socket.on("leave-room", (roomId, cb) => {
				console.log(`room left: ${roomId}`);
				socket.leave(roomId);
				cb(`room left`);
			});

			/* ------------------------- PRIVATE MSG ------------------------- */
			socket.on(
				"private-msg",
				(
					{
						msg,
						roomId,
					}: {
						msg: TSocketMsg;
						roomId: string;
					},
					cb
				) => {
					console.log("msg-backend", msg);
					const { message, createdAt } = msg;
					const sender = socket.userId;
					console.log(`private-msg received: ${message}`);
					console.log("roomId", roomId);

					io.to(roomId).emit("private-msg-receive", {
						message,
						sender,
						createdAt,
						roomId,
					});

					// save the messages in db
					(async () => {
						let msg = {
							msg: { message, sentAt: createdAt, read: false },
							chatId: roomId,
							senderId: sender,
						};
						try {
							const sockets = await io.in(roomId).fetchSockets();
							// set message as read:true, if contact is already in a socket connection.
							if (sockets.length == 2) {
								msg.msg.read = true;
							}
							await messageService.postMessage(msg);
							cb({ status: 200, msg: `msg: ${message}  saved` });
						} catch (error) {
							cb({ status: 400, msg: `msg: ${message} could not be saved` });
						}
					})();
				}
			);

			socket.on("disconnect", () => {
				console.log(`client disconnected`);
			});
		});
	}
}
