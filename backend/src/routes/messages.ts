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
router.patch("/:messageId", firebaseAuth, messageController.updateMessage);

// remove message
// PRIVATE
// params: chatId
router.delete("/:messageId", firebaseAuth, messageController.deleteMessage);

export { router as messageRouter };
