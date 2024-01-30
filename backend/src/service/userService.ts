import { Types } from "mongoose";
import { userRepository } from "../dataAccess/userRepository";
import { TUser } from "../models/UserModel";
import { TError, TSuccess } from "../types/serviceReturnTypes";

class UserService {
	async getCurrentUserProfile({
		firebaseId,
		user: { name, email, email_verified, profilePicUrl },
	}): Promise<TSuccess | TError> {
		try {
			// console.log("arg", firebaseId);
			const foundUser = await userRepository.findById(firebaseId);
			console.log("foundUser");
			if (!foundUser) {
				// create user
				console.log("newuser");
				const user = await userRepository.create({
					_id: firebaseId,
					name,
					email,
					email_verified,
					profilePicUrl,
					status: "Hello there! I am using pingpong", // keep this as default status
				});
				// console.log("user", user);
				if (!user) {
					return { error: true, status: 400, errMsg: "could not create user" };
				}
				return { status: 200, data: user };
			}
			return { status: 200, data: foundUser };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}

	async updateCurrentUserProfile({
		id,
		userData,
	}: {
		id: string;
		userData: Partial<TUser>;
	}): Promise<TSuccess | TError> {
		try {
			const updatedProfile = await userRepository.update(id, userData);

			if (!updatedProfile) {
				return { error: true, status: 400, errMsg: "could not update user" };
			}
			return { status: 200, data: updatedProfile };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}

	async findUserById(id: string): Promise<TSuccess | TError> {
		try {
			const user = await userRepository.findById(id);

			if (!user) {
				return { status: 404, data: { msg: "user not found" } };
			}
			return { status: 200, data: user };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}

	async findUserByEmail(email: string): Promise<TSuccess | TError> {
		try {
			const user = await userRepository.find({ email });

			if (!user) {
				return { status: 404, data: { msg: "user not found" } };
			}

			return { status: 200, data: user };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}

	async deleteUserById(id: string): Promise<TSuccess | TError> {
		try {
			const user = await userRepository.deleteById(id);

			if (!user) {
				return { error: true, status: 400, errMsg: "could not delete" };
			}
			return { status: 200, data: user };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}
}

export const userService = new UserService();
