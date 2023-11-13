import { NextFunction, Request, Response } from "express";
import { User } from "../../types/User";
import { MessageModel } from "../../models/MessageModel";
import mongoose from "mongoose";
import { ChatModel } from "../../models/ChatsModel";

export const postMessage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { message } = req.body;
	const chatId = req.query.chatId as string;
	try {
		const chat = await ChatModel.findById(chatId);

		if (!chat) {
			res.status(400);
			return next(new Error("Chat not found!"));
		}

		const chatObjectId = new mongoose.Types.ObjectId(chatId);

		const user = req.user as User;
		// console.log("post message", user, message, senderId);

		const messageSaved = await MessageModel.create({
			message,
			sender: user.id,
			chat: chatObjectId,
		});

		res.status(201).json(messageSaved);
	} catch (error) {
		res.status(500);
		// pass the error to the errorhandler
		next(error);
	}
};
