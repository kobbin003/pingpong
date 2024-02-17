// import { ObjectId } from "mongoose";
import { Types } from "mongoose";
import { MessageModel } from "../models/MessageModel";

class MessageRepository {
	async createMessage({
		msg,
		senderId,
		chatId,
	}: {
		msg: { message: string; sentAt: string };
		senderId: string;
		chatId: string;
	}) {
		return MessageModel.create({
			message: msg.message,
			sender: senderId,
			chat: new Types.ObjectId(chatId),
			createdAt: new Date(msg.sentAt),
		});
	}

	async createMessageMultiple(
		msgs: {
			message: string;
			createdAt: string;
			sender: string;
			chat: Types.ObjectId;
		}[]
	) {
		/** use insertMany query */

		return MessageModel.insertMany(msgs);
	}

	async findById(msgId: string) {
		return MessageModel.findById(msgId);
	}

	async findByChatId(chatId: string) {
		return MessageModel.find({ chat: chatId });
	}
	async findByChatIds(chatIds: string[]) {
		return MessageModel.find({ chat: { $in: chatIds } });
	}

	async updateMessage({
		msgId,
		updatedMsg,
	}: {
		msgId: string;
		updatedMsg: string;
	}) {
		return MessageModel.findByIdAndUpdate(msgId, { message: updatedMsg });
	}

	async findUserMessageByChatId({
		chatId,
		userId,
		offset: offsetQuery,
		limit: limitQuery,
	}: {
		chatId: string;
		userId: string;
		offset: number;
		limit: number;
	}) {
		// make sure that the chatId belongs to user
		// find message where
		// 1 - messages's chat's _id is "chatId"
		// 2 - messages's chat's relation's participants includes "userId"
		const offset = offsetQuery || 0;
		const limit = limitQuery || 5;
		return MessageModel.find({ chat: chatId })
			.populate({
				path: "chat",
				select: "_id",
				populate: {
					path: "relation",
					select: "_id",
					match: { participants: { $in: [userId] } },
					// match is done on relation field
				},
			})
			.sort({ createdAt: "desc" })
			.skip(offset)
			.limit(limit);
	}
	async deleteMessage(msgId: string) {
		return MessageModel.findByIdAndDelete(msgId);
	}
}

export const messageRepository = new MessageRepository();
