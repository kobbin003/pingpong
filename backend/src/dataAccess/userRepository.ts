import { TUser, UserModel } from "../models/UserModel";

class UserRepository {
	async createUser(user: TUser) {
		return UserModel.create(user);
	}

	async findUser(query: { [key: string]: string }) {
		return UserModel.findOne(query);
	}

	async findUserById(id: string) {
		return UserModel.findById(id);
	}

	async updateUser(id: string, userData: Partial<TUser>) {
		return UserModel.findByIdAndUpdate(id, userData, { new: true });
	}

	async deleteUserById(id: string) {
		return UserModel.findByIdAndDelete(id);
	}
}

export const userRepository = new UserRepository();
