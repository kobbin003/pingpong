import express, { Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import { connectDb } from "./db/connectDb";
import { authRouter } from "./routes/auth";
import { notFound } from "./utils/notFound";
import { errorHandler } from "./utils/errorHandler";
import { initializePassportWithJwtStrategy } from "./passport/jwtStrategy";
import passport from "passport";
const app = express();
const PORT = 3000;

/** connect to database */
connectDb().catch((err) => console.log("database error", err));

/** initializing passport */
// app.use(passport.initialize());
initializePassportWithJwtStrategy();

app.use(cors());
app.use(express.json());

// logger logs only 4xx and 5xx status responses to console.
app.use(
	logger("dev", { skip: (req: Request, res: Response) => res.statusCode < 400 })
);

// app.use("/", (req, res) => {
// 	res.json({ msg: "welcome" });
// });
/** routes */
app.use("/auth", authRouter);
// app.get("/clearsession", (req, res) => {
// 	req.logout((err) => {
// 		if (err) {
// 			// Handle any logout errors here
// 			console.error(err);
// 		}
// 	});
// 	res.json({ msg: "logged out" });
// 	// req.logout(); // Clear the user's session
// 	// res.redirect("/");
// });
/** 404 route handling middleware */
app.use((req, res, next) => {
	notFound(req, res, next);
});

/** error handler */
app.use(errorHandler);

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));
