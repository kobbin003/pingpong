import UserModel from "../../models/UserModel";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import generateJwtToken from "../../utils/generateJwtToken";

const User = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(1),
});

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		/** validate the req body */
		const isValidData = User.safeParse(req.body);
		if (isValidData.success === true) {
			// console.log(isValidData);
		} else {
			// console.log(isValidData.error.issues);
			const issues = isValidData.error.issues;
			const zodErrorMessages = issues.map(
				(issue) => `${issue.path[0]}: ${issue.message}`
			);
			return res.status(400).json({
				error: {
					statusCode: "400",
					zodErrorMessages,
				},
			});
		}
		const { name, email, password } = req.body;
		const userWithEmailExists = await UserModel.findOne({
			email,
		}).exec();
		if (userWithEmailExists) {
			res.status(400);
			return next(new Error("User with the email already exist"));
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const user = await UserModel.create({
			name,
			email,
			password: hashedPassword,
		});
		const payload = { id: user.id };
		const token = await generateJwtToken(payload);
		// console.log("token", token);
		res.status(200).json(user);
	} catch (error) {
		res.status(500);
		// pass the error to the errorhandler
		next(error);
	}
};
