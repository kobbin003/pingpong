import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/UserModel";
import mongoose from "mongoose";
import { User } from "../../types/User";

export const acceptFriendRequest = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const userId = user.id;
	const reqSenderId = req.params.reqSenderId as string;
	try {
		const user = await UserModel.findById(userId);

		const senderObjectId = new mongoose.Types.ObjectId(reqSenderId);
		// remove the sender from the request list
		const filteredRequests = user.requests.filter(
			(obj) => obj != senderObjectId
		);
		user.requests = filteredRequests;
		// add the sender into the friend list
		user.friends = [...user.friends, senderObjectId];
		await user.save();
		res.status(200).json({ msg: "request accepted" });
	} catch (error) {
		res.status(500);
		next(error);
	}
};
