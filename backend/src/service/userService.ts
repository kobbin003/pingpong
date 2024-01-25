import { userRepository } from "../dataAccess/userRepository";
import { TUser } from "../models/UserModel";

class UserService {
	async findUserById(id: string) {
		return userRepository.findUserById(id);
	}
	async deleteUserById(id: string) {
		return userRepository.deleteUserById(id);
	}

	async findUserByEmail(email: string) {
		return userRepository.findUser({ email });
	}
	async updateStatus(id: string, status: string) {
		return userRepository.updateUser(id, { status });
	}
	async updateUserById(id: string, userData: Partial<TUser>) {
		return userRepository.updateUser(id, userData);
	}
}

export const userService = new UserService();
