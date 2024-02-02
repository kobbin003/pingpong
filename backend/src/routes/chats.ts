import express from "express";
import { firebaseAuth } from "../middlware/firebaseAuth";
import { chatController } from "../controller/chatController";

const router = express.Router();

// create chat
// PRIVATE
// query: relationId
router.post("/", firebaseAuth, chatController.createChat);

//get all chats of a user
router.get("/", firebaseAuth, chatController.getUserChats);

// get chat by id
// router.get("/:id", firebaseAuth, getChat);

// get messages of a chat(chatId)
router.get("/:id/messages", firebaseAuth, chatController.getChatMessages);

// get messages of all chat of a user
// router.get()

export { router as chatRouter };
