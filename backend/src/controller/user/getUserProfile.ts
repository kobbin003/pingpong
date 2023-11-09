import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/UserModel";

export const getUserProfile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const userId = req.params.id;
	const user = req.user;
	try {
		const user = await UserModel.findById(userId).select("-password");
		if (!user) {
			res.status(404);
			return next(new Error("User not available"));
		}
		res.status(200);
		res.json(user);
	} catch (error) {
		res.status(500);
		next(error);
	}
};
