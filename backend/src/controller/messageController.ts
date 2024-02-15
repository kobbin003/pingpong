import { NextFunction, Request, Response } from "express";
import { messageService } from "../service/messageService";
import { Types } from "mongoose";
import { TMessage } from "../models/MessageModel";
import { TSocketMsgDb } from "../types/socketMsgs";

class MessageController {
	async postMessage(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		const chatId = req.query.chatId as string;
		if (!chatId) {
			res.status(400).json({ msg: "chatId missing" });
		}
		const msg = req.body as { message: string; sentAt: string };
		try {
			const message = await messageService.postMessage({
				senderId: userId,
				chatId,
				msg,
			});
			if ("error" in message) {
				res.status(message.status);
				throw new Error(message.errMsg);
			}
			res.status(message.status).json(message.data);
		} catch (error) {
			next(error);
		}
	}

	async postMessageMultiple(req: Request, res: Response, next: NextFunction) {
		const chatId = req.query.chatId as string;
		const messages = req.body.messages as TSocketMsgDb[];
		if (!chatId) {
			res.status(400).json({ msg: "chatId missing" });
		}
		if (messages) {
			try {
				// request to messageService.postMessageMultiple
				const msgs = await messageService.postMessageMultiple({
					msgs: messages,
					chatId,
				});
				if ("error" in msgs) {
					res.status(msgs.status);
					throw new Error(msgs.errMsg);
				}
				res.status(msgs.status).json(msgs.data);
			} catch (error) {
				next(error);
			}
		}
	}
	async updateMessage(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		const msgId = req.params.messageId;
		const msg = req.body.message;
		try {
			const message = await messageService.updateMessage({
				msgId,
				updatedMsg: msg,
				userId,
			});
			if ("error" in message) {
				res.status(message.status);
				throw new Error(message.errMsg);
			}
			res.status(message.status).json(message.data);
		} catch (error) {
			next(error);
		}
	}
	async deleteMessage(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		const msgId = req.params.messageId;
		try {
			const message = await messageService.deleteMessage({
				msgId,
				userId,
			});
			if ("error" in message) {
				res.status(message.status);
				throw new Error(message.errMsg);
			}
			res.status(message.status).json(message.data);
		} catch (error) {
			next(error);
		}
	}
}

export const messageController = new MessageController();
