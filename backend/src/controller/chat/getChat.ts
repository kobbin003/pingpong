import { NextFunction, Request, Response } from "express";
import { ChatModel } from "../../models/ChatsModel";

export const getChat = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const chatId = req.params.id;
	const user = req.user;
	try {
		const chat = await ChatModel.findById(chatId).populate("messages");
		if (!chat) {
			res.status(404);
			return next(new Error("Chat not available"));
		}
		res.status(200);
		res.json(chat);
	} catch (error) {
		res.status(500);
		next(new Error(error.message));
	}
};
