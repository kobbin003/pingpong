import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/UserModel";
import mongoose from "mongoose";
import { User } from "../../types/User";
import { RelationModel } from "../../models/RelationModel";

// query: recipientId
export const sendFriendRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const senderId = user.id as string;
	const recipientId = req.query.recipientId as string;
	try {
		// check if recipient is there
		const recipientUser = await UserModel.findById(recipientId);

		if (!recipientUser) {
			res.status(400);
			return next(new Error("User not found"));
		}

		// check if they already have a relation
		// (can be used for sending friend request again)
		const relationFound = await RelationModel.findOne()
			.where("participants")
			.all([senderId, recipientId]);
		if (relationFound) {
			res
				.status(200)
				.json({ ...relationFound, sender: senderId, status: "pending" });
		}

		// create the friend
		const sender = new mongoose.Types.ObjectId(senderId);
		const recipient = new mongoose.Types.ObjectId(recipientId);
		const relation = await RelationModel.create({
			participants: [sender, recipient],
			sender,
			status: "pending",
		});
		await relation.save();
		res.status(200).json(relation);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
