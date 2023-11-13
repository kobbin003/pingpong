import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/UserModel";
import mongoose from "mongoose";
import { User } from "../../types/User";
import { RelationModel } from "../../models/RelationModel";

export const rejectFriendRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const recipientId = user.id;
	const relationId = req.params.relationId;

	try {
		// check that the relation exists
		const relation = await RelationModel.findById(relationId);
		if (!relation) {
			res.status(404);
			return next(new Error("Not found"));
		}

		//check that the recipient in the relationId is the user
		const relationRecipient = relation.recipient;
		if (relationRecipient !== recipientId) {
			res.status(401);
			return next(new Error("UnAuthorised"));
		}

		// update the relation
		relation.status = "Declined";

		await relation.save();

		res.status(200).json(relation);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
