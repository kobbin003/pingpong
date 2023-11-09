import { NextFunction, Request, Response } from "express";
import { User } from "../../types/User";
import { ChatModel } from "../../models/ChatsModel";

export const createChat = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const user1Id = req.query.user1Id;
	const user2Id = req.query.user2Id;
	try {
		const isAllowed = user.id == user1Id || user.id == user2Id;
		if (!isAllowed) {
			res.status(401);
			return next(new Error("UnAuthorized"));
		}
		const chat = new ChatModel({ participants: [user1Id, user2Id] });
		await chat.validate(); // validation set in validate method in pre hook
		const chatSaved = await chat.save();
		res.status(201).json(chatSaved);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
