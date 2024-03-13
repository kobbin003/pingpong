import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import { notFound } from "./utils/notFound";
import { errorHandler } from "./utils/errorHandler";
import { createServer } from "http";
// import { createServer } from "https";
import { messageRouter } from "./routes/messages";
import { chatRouter } from "./routes/chats";
import { userRouter } from "./routes/users";
import { relationRouter } from "./routes/relations";
import "dotenv/config";
import { firebaseInit } from "./firebase/firebaseInit";
import { SocketService } from "./socketio/socket";
const app = express();
const PORT = process.env.PORT || 3000;

async function init() {
	/** express app is attached to the httpserver */
	const httpServer = createServer(app);

	const socketService = new SocketService();
	socketService.io.attach(httpServer);
	socketService.initListeners();

	/** connect to database */
	connectDb(socketService.io).catch((err) =>
		console.log("database error", err)
	);

	/** initialise firebase-admin */
	firebaseInit();

	// app.use(cors());
	app.use(
		cors({
			origin:
				process.env.NODE_ENV == "production"
					? "https://pingpong-zeta.vercel.app/"
					: "*",
		})
	);

	app.use(express.json());

	// logger logs only 4xx and 5xx status responses to console.
	app.use(
		logger("dev", {
			skip: (req: Request, res: Response) => res.statusCode < 400,
		})
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

	// handle termination:
	function shutdown() {
		// disconnect all connected sockets
		socketService.io.disconnectSockets();

		// close http server:
		httpServer.close(() => {
			console.log(`server closed. exiting process`);
			process.exit(0);
		});
	}

	// signal interrupt
	process.on("SIGINT", () => {
		console.log(`received SIGINT. Closing server gracefully...`);
		shutdown();
	});

	// signal termination
	process.on("SIGTERM", () => {
		console.log(`received SIGTERM. Closing server gracefully...`);
		shutdown();
	});
}

init();
