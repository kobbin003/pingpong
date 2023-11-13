import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/UserModel";
import mongoose from "mongoose";
import { User } from "../../types/User";
import { RelationModel } from "../../models/RelationModel";

export const sendFriendRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const senderId = user.id as string;
	const recipientId = req.query.recipientId as string;
	try {
		const recipientUser = await UserModel.findById(recipientId);

		if (!recipientUser) {
			res.status(400);
			return next(new Error("User not found"));
		}

		// create the friend
		const relation = await RelationModel.create({
			sender: new mongoose.Types.ObjectId(senderId),
			recipient: new mongoose.Types.ObjectId(recipientId),
			status: "Pending",
		});

		await relation.save();
		res.status(200).json(relation);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
