import { NextFunction, Request, Response } from "express";
import { userService } from "../service/userService";
import { userRepository } from "../dataAccess/userRepository";
import { TUser } from "../models/UserModel";

class UserController {
	async getCurrentUserProfile(req: Request, res: Response, next: NextFunction) {
		const { firebaseId, name, email, email_verified, profilePicUrl } = req;
		try {
			const foundUser = await userService.findUserById(firebaseId);

			if (!foundUser && email_verified) {
				// create user
				const user = await userRepository.createUser({
					_id: firebaseId,
					name,
					email,
					email_verified,
					profilePicUrl,
					status: "Hello there! I am using pingpong", // keep this as default status
				});
				if (!user) {
					res.status(500);
					throw new Error("could not create user");
				}
				res.status(200).json(user);
			} else {
				res.status(200).json(foundUser);
			}
		} catch (error) {
			res.status(500);
			next(error);
		}
	}

	async updateCurrentUserProfile(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { firebaseId } = req;
		const { name, profilePicUrl } = req.body as Partial<TUser>;
		try {
			const updatedProfile = await userService.updateUserById(firebaseId, {
				name,
				profilePicUrl,
			});

			if (!updatedProfile) {
				res.status(404);
				throw new Error("could not update");
			}
			res.status(200).json(updatedProfile);
		} catch (error) {
			next(error);
		}
	}

	async updateCurrentUserStatus(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { firebaseId } = req;
		const { status } = req.body;
		try {
			const updatedProfile = await userService.updateStatus(firebaseId, status);
			if (!updatedProfile) {
				res.status(404);
				throw new Error("could not update");
			}
			res.status(200).json({ status: updatedProfile.status });
		} catch (error) {
			next(error);
		}
	}

	async deleteCurrentUserProfile(
		req: Request,
		res: Response,
		next: NextFunction
	) {
		const { firebaseId: id } = req;
		try {
			const user = await userService.deleteUserById(id);
			if (!user) {
				res.status(404);
				throw new Error("user not found");
			}
			res.status(200).json(user);
		} catch (error) {
			next(error);
		}
	}

	async getUserById(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;
		try {
			const user = await userService.findUserById(id);
			if (!user) {
				res.status(404);
				throw new Error("User not found");
			}
		} catch (error) {
			next(error);
		}
	}

	async getUserByEmail(req: Request, res: Response, next: NextFunction) {
		const email = req.query.email as string;
		try {
			const user = await userService.findUserByEmail(email);
			if (!user) {
				res.status(404);
				throw new Error("User not found");
			}
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
