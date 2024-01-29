import { NextFunction, Request, Response } from "express";
import { chatService } from "../service/chatService";

class ChatController {
	async createChat(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		const relationId = req.query.relationId as string;
		try {
			const chat = await chatService.createChat({ relationId, userId });
			if ("error" in chat) {
				res.status(chat.status);
				throw new Error(chat.errMsg);
			}
			res.status(chat.status).json(chat.data);
		} catch (error) {
			next(error);
		}
	}

	async getUserChat(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		try {
			const chats = await chatService.getUserChats(userId);
			if ("error" in chats) {
				res.status(chats.status);
				throw new Error(chats.errMsg);
			}
			res.status(chats.status).json(chats.data);
		} catch (error) {
			next(error);
		}
	}

	async getChatMessages(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		const chatId = req.params.id;
		try {
			const chats = await chatService.getMessagesByChatId({ chatId, userId });
			if ("error" in chats) {
				res.status(chats.status);
				throw new Error(chats.errMsg);
			}
			res.status(chats.status).json(chats.data);
		} catch (error) {
			next(error);
		}
	}

	async getAllUserChatMessages(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { firebaseId: userId } = req;
		try {
			const chats = await chatService.getUserChats(userId);
			if ("error" in chats) {
				res.status(chats.status);
				throw new Error(chats.errMsg);
			}
			res.status(chats.status).json(chats.data);
		} catch (error) {
			next(error);
		}
	}
}

export const chatController = new ChatController();
