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
				return { error: true, status: 400, errMsg: "error" };
			}

			/** get each relation's chat */
			const relationIds = relations.map((relation) => relation.id);

			// const chats = await ChatModel.find().where("relation").in(relationIds);
			const chats = await ChatModel.find({ relation: { $in: relationIds } });

			return { status: 200, data: chats };
		} catch (error) {
			return { error: true, status: 400, errMsg: error.message };
		}
	}

	async getMessagesByChatId({
		chatId,
		userId,
	}: {
		chatId: string;
		userId: string;
	}): Promise<TSuccess | TError> {
		try {
			// check chatId is of user
			// find chat where
			// 1 - id is chatId
			// 2 - user is present in participant of chat's relation
			const chat = await ChatModel.findById(chatId)
				// .populate("relation")
				.populate({
					path: "relation",
					populate: { path: "participants", model: "user" },
				}) // so that we can populate the participants field of the relation
				.where({ relation: { participants: { $in: [userId] } } });
			// .where("relation.participants")
			// .in([userId]);

			if (!chat) {
				return { error: true, status: 401, errMsg: "not authorized" };
			}
			const messages = await messageRepository.findByChatId(chat.id);
			if (!messages) {
				return { error: true, status: 404, errMsg: "not found" };
			}
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
