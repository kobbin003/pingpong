import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import { notFound } from "./utils/notFound";
import { errorHandler } from "./utils/errorHandler";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import { messageRouter } from "./routes/messages";
import { chatRouter } from "./routes/chats";
import { userRouter } from "./routes/users";
import { relationRouter } from "./routes/relations";
import "dotenv/config";
import { firebaseInit } from "./firebase/firebaseInit";
import admin from "firebase-admin";
const app = express();
const PORT = 3000;

/** connect to database */
connectDb().catch((err) => console.log("database error", err));

/** initialise firebase-admin */
firebaseInit();

/** express app is attached to the httpserver */
const httpServer = createServer(app);

export const io = new Server(httpServer, {
	cors: {
		origin: process.env.NODE_ENV == "production" ? "" : "*",
	},
});

type TSocketMsg = {
	message: string;
	createdAt: string;
	// sender: string; //sender uid
};
export type TSocketMsgDb = TSocketMsg & { sender: string };

//socket auth middleware:
io.use(async (socket: Socket, next: NextFunction) => {
	const accessToken = socket.handshake.auth.accessToken;
	console.log("token", accessToken);
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

io.on("connection", (socket) => {
	console.log(" client connected: ", socket.id);
	console.log("user uid", socket.userId);

	/* ---------------------- ROOM ------------------------------- */
	socket.on("join-room", (roomId, cb) => {
		console.log(`room joined: ${roomId}`);
		socket.join(roomId);
		cb(`room joined`);
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
			// socket.emit("private-msg-receive", { msg: message });
			io.to(roomId).emit("private-msg-receive", { message, sender, createdAt });
			cb({ status: 200, msg: { message, sender, createdAt } });
		}
	);

	socket.on("disconnect", () => {
		console.log(`client disconnected`);
	});
});

app.use(cors());

app.use(express.json());

// logger logs only 4xx and 5xx status responses to console.
app.use(
	logger("dev", { skip: (req: Request, res: Response) => res.statusCode < 400 })
);

app.get("/welcome", (req, res) => {
	// res.send("Welcome!");
	// res.json({ msg: "Welcome" });
	res.status(400);
	throw new Error("welcome error");
});

/** routes */

app.use("/users", userRouter);

app.use("/relations", relationRouter);

app.use("/messages", messageRouter);

app.use("/chats", chatRouter);

/** 404 route handling middleware */
app.use((req, res, next) => {
	notFound(req, res, next);
});

/** error handler */
app.use(errorHandler);

httpServer.listen(PORT, () =>
	console.log(`server is running on port: ${PORT}`)
);
