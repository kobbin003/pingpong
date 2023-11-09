import { NextFunction, Request, Response } from "express";
import { ChatModel } from "../../models/ChatsModel";
import { MessageModel } from "../../models/MessageModel";
import mongoose from "mongoose";

export const getChatMessages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const chatId = req.params.id as string;
	const chatObjectId = new mongoose.Types.ObjectId(chatId);
	const user = req.user;
	try {
		const messages = await MessageModel.find({ chat: chatObjectId });
		if (messages.length > 1) {
			res.status(200);
			res.json(messages);
		} else {
			res.status(404);
			return next(new Error("Chat not available"));
		}
	} catch (error) {
		res.status(500);
		next(new Error(error.message));
	}
};
