import { string } from "zod";
import { chatRepository } from "../dataAccess/chatRepository";
import { messageRepository } from "../dataAccess/messageRepository";
import { relationRepository } from "../dataAccess/relationRespository";
import { ChatModel } from "../models/ChatsModel";
import { MessageModel } from "../models/MessageModel";
import { RelationModel } from "../models/RelationModel";
import { TError, TSuccess } from "../types/serviceReturnTypes";
import { Types } from "mongoose";

class ChatService {
	async createChat({
		relationId,
		userId,
	}: {
		relationId: string;
		userId: string;
	}): Promise<TSuccess | TError> {
		try {
			/** find relation with the relationId and
			 * 1 - the user is one of the participant
			 * 2 - status is "accepted" */
			const relation = await relationRepository.find({
				_id: relationId,
				status: "accepted",
				participants: { $in: [userId] },
			});

			if (!relation) {
				return { error: true, status: 400, errMsg: "relation not found" };
			}

			/** create new chat */
			const chat = await chatRepository.create({
				relation: new Types.ObjectId(relationId),
			});

			return { status: 200, data: chat };
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}

	async getUserChats(userId: string): Promise<TSuccess | TError> {
		// const user = req.user as User;
		try {
			/** get all relations of the user.id */

			const relations = await relationRepository.findByUserId(userId);
			if (!relations) {
				return { error: true, status: 400, errMsg: "could not find chat" };
			}
			// console.log("relations", relations);
			// console.log("participants", relations[0].participants);
			/** get each relation's chat */
			const relationIds = relations.map((relation) => relation.id);

			// const chats = await ChatModel.find().where("relation").in(relationIds);
			const chats = await chatRepository.findWithContact(userId, relationIds);
			// const chats = await ChatModel.find({ relation: { $in: relationIds } });

			if (!chats) {
				return { error: true, status: 400, errMsg: "could not find chat" };
			}
			// console.log("chats", chats);
			return { status: 200, data: chats };
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}

	async getMessagesByChatId({
		chatId,
		userId,
		limit,
		offset,
	}: {
		chatId: string;
		userId: string;
		limit: number;
		offset: number;
	}): Promise<TSuccess | TError> {
		try {
			const messages = await messageRepository.findUserMessageByChatId({
				chatId,
				userId,
				limit,
				offset,
			});
			// console.log("messages", messages);
			// console.log("userId", userId);

			if (!messages) {
				return { error: true, status: 404, errMsg: "not foundddd" };
			}
			// if(messages.length==0){

			// 	return { status: 200, data: messages };
			// }
			return { status: 200, data: messages };
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}

	async getAllUserChatMessages(userId: string) {
		try {
			// find chat where user is participant
			const userChats = await this.getUserChats(userId);
			if ("error" in userChats) {
				return { error: true, status: 404, errMsg: "not found" };
			} else {
				const userChatIds = userChats.data.map(
					(chat: { id: string }) => chat.id
				);

				const messages = await messageRepository.findByChatIds(userChatIds);

				if (!messages) {
					return { error: true, status: 404, errMsg: "not found" };
				}
				return { status: 200, data: messages };
			}
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}
}

export const chatService = new ChatService();
