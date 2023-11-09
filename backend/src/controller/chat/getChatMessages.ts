import { NextFunction, Request, Response } from "express";
import { MessageModel } from "../../models/MessageModel";
import mongoose from "mongoose";

export const getChatMessages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const chatId = req.params.id as string;
	const chatObjectId = new mongoose.Types.ObjectId(chatId);
	try {
		const messages = await MessageModel.find({ chat: chatObjectId }).sort({
			createdAt: -1, // newest to oldest(descending)
		});
		console.log("get chat messages", chatObjectId, messages);
		if (messages.length > 0) {
			res.status(200);
			res.json(messages);
		} else {
			res.status(204);
			res.json({ msg: "No message found for this chat" });
		}
	} catch (error) {
		res.status(500);
		next(error);
	}
};
