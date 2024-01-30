import { NextFunction, Request, Response } from "express";
import { userService } from "../service/userService";
import { TUser } from "../models/UserModel";

class UserController {
	async getCurrentUserProfile(req: Request, res: Response, next: NextFunction) {
		const {
			firebaseId,
			user: { name, email, email_verified, profilePicUrl },
		} = req;
		// console.log(
		// 	"controller",
		// 	firebaseId,
		// 	name,
		// 	email,
		// 	email_verified,
		// 	profilePicUrl
		// );
		try {
			const user = await userService.getCurrentUserProfile({
				firebaseId,
				user: { email, email_verified, name, profilePicUrl },
			});

			if ("error" in user) {
				res.status(user.status);
				throw new Error(user.errMsg);
			} else {
				res.status(user.status).json(user.data);
			}
		} catch (error) {
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
			const user = await userService.updateCurrentUserProfile({
				id: firebaseId,
				userData: { name, profilePicUrl },
			});

			if ("error" in user) {
				res.status(user.status);
				throw new Error(user.errMsg);
			}

			res.status(user.status).json(user.data);
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
			const user = await userService.updateCurrentUserProfile({
				id: firebaseId,
				userData: { status },
			});

			if ("error" in user) {
				res.status(user.status);
				throw new Error(user.errMsg);
			}

			res.status(user.status).json(user.data);
		} catch (error) {
			next(error);
		}
	}

	async getUserById(req: Request, res: Response, next: NextFunction) {
		const id = req.params.id;
		try {
			const user = await userService.findUserById(id);
			if ("error" in user) {
				res.status(user.status);
				throw new Error(user.errMsg);
			}
			res.status(user.status).json(user.data);
		} catch (error) {
			next(error);
		}
	}

	async getUserByEmail(req: Request, res: Response, next: NextFunction) {
		const email = req.query.email as string;
		try {
			const user = await userService.findUserByEmail(email);
			if ("error" in user) {
				res.status(user.status);
				throw new Error(user.errMsg);
			}
			res.status(user.status).json(user.data);
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
			if ("error" in user) {
				res.status(user.status);
				throw new Error(user.errMsg);
			}
			res.status(user.status).json(user.data);
		} catch (error) {
			next(error);
		}
	}
}

export const userController = new UserController();
