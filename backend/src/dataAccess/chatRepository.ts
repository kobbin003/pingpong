import { ChatModel, TChat } from "../models/ChatsModel";

class ChatRepository {
	async create(chat: TChat) {
		return ChatModel.create(chat);
	}

	async find(query: { [key: string]: any }) {
		return ChatModel.find(query);
	}

	async findWithContact(userId: string, relationIds: string[]) {
		return ChatModel.find({
			relation: { $in: relationIds },
		}).populate({
			path: "relation",
			// select: "_id",
			select: "participants",
			populate: {
				path: "participants",
				// select: "_id",
				match: { _id: { $not: { $eq: userId } } },
			},
		});
	}
	// async findWithContact(relationIds: string[]) {
	// 	return ChatModel.find({
	// 		relation: { $in: relationIds },
	// 	}).populate({
	// 		path: "relation",
	// 			select: "_id",
	// 			match: { participants: { $in: [userId] } },
	// 	});
	// }

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
