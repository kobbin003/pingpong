import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import { notFound } from "./utils/notFound";
import { errorHandler } from "./utils/errorHandler";
import { createServer } from "http";
import { Server } from "socket.io";
import { messageRouter } from "./routes/messages";
import { chatRouter } from "./routes/chats";
import { userRouter } from "./routes/users";
import { relationRouter } from "./routes/relations";
import "dotenv/config";
import { firebaseInit } from "./firebase/firebaseInit";

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
io.on("connection", (socket) => {
	console.log(" client connected: ", socket.id);
	/* --------------------------------------------------------------- */
	// socket.emit("from-server", "Welcome to the server!");

	// socket.on("client-message", (message, cb) => {
	// 	console.log(`Received from client: ${message}`);
	// 	cb(`got the message`);
	// 	// io.emit("from-server", message);
	// });
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
	socket.on("private-msg", (msg, cb) => {
		const { msg: message, roomId } = msg as { msg: string; roomId: string };
		console.log(`private-msg received: ${msg}`);
		console.log("roomId", roomId);
		// socket.emit("private-msg-receive", { msg: message });
		io.to(roomId).emit("private-msg-receive", { msg: message });
		cb({ status: 200, msg: message });
	});

	socket.on("disconnect", () => {
		console.log(`client disconnected`);
	});
});
// console.log("hiii");
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
