import { NextFunction, Request, Response } from "express";
import { messageService } from "../service/messageService";

class MessageController {
	async postMessage(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		const chatId = req.query.chatId as string;
		const msg = req.body.message;
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
