import { ChatModel, TChat } from "../models/ChatsModel";

class ChatRepository {
	async create(chat: TChat) {
		return ChatModel.create(chat);
	}

	async find(query: { [key: string]: string }) {
		// return UserModel.findOne(query);
	}

	async findById(id: string) {
		// return UserModel.findById(id);
	}

	async update(id: string, userData: Partial<TChat>) {
		// return UserModel.findByIdAndUpdate(id, userData, { new: true });
	}

	async deleteById(id: string) {
		// return UserModel.findByIdAndDelete(id);
	}
}

export const chatRepository = new ChatRepository();
