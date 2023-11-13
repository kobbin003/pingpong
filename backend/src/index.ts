import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import { authRouter } from "./routes/auth";
import { notFound } from "./utils/notFound";
import { errorHandler } from "./utils/errorHandler";
import { initializePassportWithJwtStrategy } from "./passport/jwtStrategy";
import { createServer } from "http";
import { Server } from "socket.io";
import { messageRouter } from "./routes/messages";
import { chatRouter } from "./routes/chats";
import { userRouter } from "./routes/users";
import { relationRouter } from "./routes/relations";
const app = express();
const PORT = 3000;

/** connect to database */
connectDb().catch((err) => console.log("database error", err));

/** express app is attached to the httpserver */
const httpServer = createServer(app);

export const io = new Server(httpServer, {
	cors: {
		origin: process.env.NODE_ENV == "production" ? "" : "*",
	},
});

// interface CustomSocket extends Socket {
// 	username: string;
// }

// /** middleware to check if the username provided by the client is the right one */
// io.use((socket: CustomSocket, next: NextFunction) => {
// 	const username = socket.handshake.auth.username;
// 	if (!username) {
// 		return next(new Error("invalid username"));
// 	}
// 	socket.username = username;
// 	next();
// });

/** initializing passport */
initializePassportWithJwtStrategy();

app.use(cors());

app.use(express.json());

// logger logs only 4xx and 5xx status responses to console.
app.use(
	logger("dev", { skip: (req: Request, res: Response) => res.statusCode < 400 })
);

// app.use("/", (req, res) => {
// 	res.send("Welcome!");
// });

/** routes */
app.use("/auth", authRouter);

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
