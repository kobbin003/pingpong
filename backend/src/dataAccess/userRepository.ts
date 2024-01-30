import { TUser, UserModel } from "../models/UserModel";

class UserRepository {
	async create(user: TUser) {
		// console.log("repo", user);
		return UserModel.create(user);
	}

	async find(query: { [key: string]: string }) {
		return UserModel.findOne(query);
	}

	async findById(id: TUser["_id"]) {
		// return UserModel.findOne({ _id: id });
		return UserModel.findById(id);
	}

	async update(id: string, userData: Partial<TUser>) {
		return UserModel.findByIdAndUpdate(id, userData, { new: true });
	}

	async deleteById(id: string) {
		return UserModel.findByIdAndDelete(id);
	}
}

export const userRepository = new UserRepository();
