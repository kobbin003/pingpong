// import { ObjectId } from "mongoose";
import { Types } from "mongoose";
import { MessageModel } from "../models/MessageModel";

class MessageRepository {
	async createMessage({
		msg,
		senderId,
		chatId,
	}: {
		msg: string;
		senderId: string;
		chatId: string;
	}) {
		return MessageModel.create({
			message: msg,
			sender: senderId,
			chat: new Types.ObjectId(chatId),
		});
	}

	async findById(msgId: string) {
		return MessageModel.findById(msgId);
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

	async deleteMessage(msgId: string) {
		return MessageModel.findByIdAndDelete(msgId);
	}
}

export const messageRepository = new MessageRepository();
