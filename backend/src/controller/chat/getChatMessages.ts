import { NextFunction, Request, Response } from "express";
import { MessageModel } from "../../models/MessageModel";

export const getChatMessages = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const chatId = req.params.id as string;
	try {
		const messages = await MessageModel.find({ chat: chatId }).sort({
			createdAt: -1, // newest to oldest(descending)
		});

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
