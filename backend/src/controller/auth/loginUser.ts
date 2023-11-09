import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../../types/User";
import generateJwtToken from "../../utils/generateJwtToken";
import { UserModel } from "../../models/UserModel";

export const loginUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { email, password } = req.body;
	try {
		const foundUserWithEmail = await UserModel.findOne({ email });
		if (!foundUserWithEmail) {
			return next(new Error("User not found"));
		}
		const passwordMatches = await bcrypt.compare(
			password,
			foundUserWithEmail.password
		);

		if (passwordMatches) {
			const { _id, name, email, createdAt } = foundUserWithEmail;
			const user: User = { id: _id.toString(), name, email, createdAt };
			const jwtPayload = { id: user.id };
			const token = await generateJwtToken(jwtPayload);
			res.status(200).json({ ...user, token });
		} else {
			return next(new Error("Incorrect password"));
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
};
