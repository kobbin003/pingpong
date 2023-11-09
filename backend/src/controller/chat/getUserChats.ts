import { NextFunction, Request, Response } from "express";
import { ChatModel } from "../../models/ChatsModel";
import { User } from "../../types/User";

export const getUserChats = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	try {
		const chat = await ChatModel.find({
			participants: { $all: [user.id] },
		});
		if (!chat) {
			res.status(404);
			return next(new Error("Chat not available"));
		}
		res.status(200);
		res.json(chat);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
