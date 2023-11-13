import { NextFunction, Request, Response } from "express";
import { ChatModel } from "../../models/ChatsModel";
import { UserModel } from "../../models/UserModel";
import { User } from "../../types/User";

type TUpdateType = {
	name: string;
	profilePic: string;
	desc: string;
};

export const updateCurrentUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user = req.user as User;
	const userId = user.id;
	const { name, profilePic, desc }: TUpdateType = req.body;

	try {
		const user = await UserModel.findById(userId).select("-password");
		if (!user) {
			res.status(404);
			return next(new Error("User not available"));
		}

		// update
		name && (user.name = name);
		profilePic && (user.profilePicUrl = profilePic);
		desc && (user.desc = desc);

		res.status(200);

		res.json(user);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
