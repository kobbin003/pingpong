import { NextFunction, Request, Response } from "express";
import { MessageModel } from "../../models/MessageModel";
import { User } from "../../types/User";

export const deleteMessage = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;

	const messageId = req.query.messageId;

	try {
		const message = await MessageModel.findById(messageId);

		const isAllowed = user.id == message.sender.toString();

		if (!isAllowed) {
			res.status(401);
			return next(new Error("UnAuthorized"));
		}

		await message.deleteOne();

		res.status(200).json({ msg: "message successfully deleted" });
	} catch (error) {
		res.status(500);
		// pass the error to the errorhandler
		next(error);
	}
};
