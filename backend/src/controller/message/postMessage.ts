import { NextFunction, Request, Response } from "express";
import { User } from "../../types/User";
import { MessageModel } from "../../models/MessageModel";
export const postMessage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { message } = req.body;
	const user = req.user as User;
	try {
		// console.log("post message", user, message, senderId);
		const messageSaved = await MessageModel.create({
			message,
			sender: user.id,
		});
		res.status(201).json(messageSaved);
	} catch (error) {
		res.status(500);
		// pass the error to the errorhandler
		next(error);
	}
};
