import { messageRepository } from "../dataAccess/messageRepository";
import { TError, TSuccess } from "../types/serviceReturnTypes";

class MessageService {
	async postMessage({
		msg,
		senderId,
		chatId,
	}: {
		msg: string;
		senderId: string;
		chatId: string;
	}): Promise<TSuccess | TError> {
		try {
			const message = await messageRepository.createMessage({
				msg,
				chatId,
				senderId,
			});

			if (!message) {
				return { error: true, status: 400, errMsg: "could not create message" };
			}

			return { status: 200, data: message };
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}

	async updateMessage({
		msgId,
		updatedMsg,
		userId,
	}: {
		msgId: string;
		updatedMsg: string;
		userId: string;
	}) {
		try {
			const message = await messageRepository.findById(msgId);
			if (!message) {
				return { error: true, status: 404, errMsg: "message not found" };
			}
			// check if user is the sender of the message
			const userIsSender = message.sender == userId;
			if (!userIsSender) {
				return { error: true, status: 401, errMsg: "Not Authorised" };
			}

			message.message = updatedMsg;
			await message.save();

			return { status: 200, data: message };
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}

	async deleteMessage({ msgId, userId }: { msgId: string; userId: string }) {
		try {
			const message = await messageRepository.findById(msgId);
			if (!message) {
				return { error: true, status: 404, errMsg: "message not found" };
			}
			// check if user is the sender of the message
			const userIsSender = message.sender == userId;
			if (!userIsSender) {
				return { error: true, status: 401, errMsg: "Not Authorised" };
			}

			// delete the message
			await messageRepository.deleteMessage(msgId);

			if (!message) {
				return { error: true, status: 400, errMsg: "could not delete message" };
			}

			return { status: 200, data: message };
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}
}

export const messageService = new MessageService();
