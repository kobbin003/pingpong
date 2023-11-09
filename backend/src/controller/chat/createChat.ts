import { NextFunction, Request, Response } from "express";
import { User } from "../../types/User";
import { ChatModel } from "../../models/ChatsModel";
import { UserModel } from "../../models/UserModel";

export const createChat = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const userId = user.id;
	const friendId = req.query.friendId;
	try {
		const friend = await UserModel.findById(friendId);
		if (!friend) {
			res.status(400);
			next(new Error("user not found with the given Id"));
		}
		const chat = new ChatModel({ participants: [userId, friendId] });
		await chat.validate(); // validation set in validate method in pre hook
		const chatSaved = await chat.save();
		res.status(201).json(chatSaved);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
