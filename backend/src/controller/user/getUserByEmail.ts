import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../models/UserModel";

export const getUserByEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const email = req.params.email;
	try {
		const user = await UserModel.find({ email }).select("-password");
		if (!user) {
			res.status(404);
			return next(new Error("User not found"));
		}
		res.status(200).json(user);
	} catch (error) {
		res.status(500);
		return next(error);
	}
};
