import { NextFunction, Request, Response } from "express";
import { User } from "../../types/User";
import { RelationModel } from "../../models/RelationModel";
import mongoose from "mongoose";

// params: relationId
export const acceptFriendRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	// recipient is the user
	const userId = user.id;
	const relationId = req.params.relationId;

	try {
		// check that the relation exists
		const relation = await RelationModel.findById(relationId);

		if (!relation) {
			// console.log("relation not found");
			res.status(404);
			return next(new Error("Not found"));
		}

		// check that the user is in the relation
		const userIsInTheRelation = relation.participants.some(
			(user) => user.toString() == userId
		);
		// const userIsInTheRelation = relation.participants.includes(userObjectId);

		if (!userIsInTheRelation) {
			// console.log("user not found", relation.participants, userObjectId);

			res.status(404);
			return next(new Error("Not Found"));
		}

		// check that the user is not the sender
		const userIstheSender = relation.sender.toString() === userId;

		if (userIstheSender) {
			console.log("sender cannot accept", relation.sender.toString(), userId);
			res.status(401);
			return next(new Error("Unauthorized"));
		}

		// update the relation
		relation.status = "accepted";

		await relation.save();

		res.status(200).json(relation);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
