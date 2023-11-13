import { NextFunction, Request, Response } from "express";
import { User } from "../../types/User";
import { ChatModel } from "../../models/ChatsModel";
import { RelationModel } from "../../models/RelationModel";

export const createChat = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const relationId = req.query.relationId as string;

	try {
		/** check if relation exists with "Accepted" status */
		const relation = await RelationModel.findOne({
			_id: relationId,
			status: "accepted",
		});

		if (!relation) {
			res.status(400);
			next(new Error("relation not found"));
		}

		/** create new chat */

		const chat = new ChatModel({ relation: relation._id });

		// await chat.validate(); // validation set in validate method in pre hook

		const chatSaved = await chat.save();

		res.status(201).json(chatSaved);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
