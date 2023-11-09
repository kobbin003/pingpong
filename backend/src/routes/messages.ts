import express from "express";
import passport from "passport";
import { postMessage } from "../controller/message/postMessage";
import { deleteMessage } from "../controller/message/deleteMessage";

const router = express.Router();

// post message
router.post("/", passport.authenticate("jwt", { session: false }), postMessage);

// remove message
router.delete(
	"/",
	passport.authenticate("jwt", { session: false }),
	deleteMessage
);

export { router as messageRouter };
