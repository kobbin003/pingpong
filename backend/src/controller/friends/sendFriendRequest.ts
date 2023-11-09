import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/UserModel";
import mongoose from "mongoose";
import { User } from "../../types/User";

export const sendFriendRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const senderId = user.id as string;
	const recipientId = req.query.recipientId;
	try {
		// const sender = await UserModel.findById(senderId);
		const recipient = await UserModel.findById(recipientId);

		const senderObjectId = new mongoose.Types.ObjectId(senderId);
		recipient.requests = [...recipient.requests, senderObjectId];
		await recipient.save();
		res.status(200).json({ msg: "request sent" });
	} catch (error) {
		res.status(500);
		next(error);
	}
};
