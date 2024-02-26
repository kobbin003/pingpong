import express from "express";
import { firebaseAuth } from "../middlware/firebaseAuth";
import { messageController } from "../controller/messageController";

const router = express.Router();

// post message
// PRIVATE
// query: chatId
// body: {msg:string; sentAt :string}
// sentAt -> in ISOstring.
router.post("/", firebaseAuth, messageController.postMessage);

// post multiple message
// PRIVATE
// query: chatId
// body :{messages:{}[]}
router.post("/multiple", firebaseAuth, messageController.postMessageMultiple);

// update message
// PRIVATE
// params: chatId
// body: {message}
router.patch(
	"/update/:messageId",
	firebaseAuth,
	messageController.updateMessage
);

// get all unread message to read
// PRIVATE
// query: chatId
router.get("/unread", firebaseAuth, messageController.getUnreadMsgs);

// set all unread message to read
// PRIVATE
// query: chatId
router.patch("/read", firebaseAuth, messageController.readUnreadMsgs);

// remove message
// PRIVATE
router.delete("/:messageId", firebaseAuth, messageController.deleteMessage);

export { router as messageRouter };
