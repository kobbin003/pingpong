import { NextFunction, Request, Response } from "express";
import { ChatModel } from "../../models/ChatsModel";
import { User } from "../../types/User";
import { RelationModel } from "../../models/RelationModel";

export const getUserChats = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;

	try {
		/** get all relations */
		const relations = await RelationModel.find()
			.where("participants")
			.in([user.id]);

		if (relations.length < 1) {
			res.status(404);
			return next(new Error("not available"));
		}

		/** get each relation's chat */
		const chatIds = relations.map((relation) => relation.id);

		const chat = await ChatModel.find().where("relation").in(chatIds);

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
