import express from "express";
import { createChat } from "../controller/chat/createChat";
import passport from "passport";
import { getUserChats } from "../controller/chat/getUserChats";
import { getChat } from "../controller/chat/getChat";
import { getChatMessages } from "../controller/chat/getChatMessages";

const router = express.Router();

// create chat
router.post("/", passport.authenticate("jwt", { session: false }), createChat);

// get chat by id
router.get("/:id", passport.authenticate("jwt", { session: false }), getChat);

// get messages of a chat
router.get(
	"/:id/messages",
	passport.authenticate("jwt", { session: false }),
	getChatMessages
);

//get all chats of a user
router.get("/", passport.authenticate("jwt", { session: false }), getUserChats);

export { router as chatRouter };
