import { relationRepository } from "../dataAccess/relationRespository";
import { userRepository } from "../dataAccess/userRepository";
import { TRelation } from "../models/RelationModel";
import { TError, TSuccess } from "../types/serviceReturnTypes";

class RelationService {
	async sendFriendRequest({
		senderId,
		recipientId,
	}: {
		senderId: string;
		recipientId: string;
	}): Promise<TSuccess | TError> {
		try {
			// check if recipient is there
			const recipientUser = await userRepository.findById(recipientId);
			if (!recipientUser) {
				return { error: true, status: 400, errMsg: "User not found" };
			}
			// check if they already have a relation
			// (can be used for sending friend request again after the request has been declined)
			const relationFound = await relationRepository.findByParticipant({
				senderId,
				recipientId,
			});

			// if found, send the relation after updating the sender and the status
			if (relationFound) {
				return {
					status: 200,
					data: { ...relationFound, sender: senderId, status: "pending" },
				};
			}

			// create the relation
			const relation = await relationRepository.create({
				participants: [senderId, recipientId],
				sender: senderId,
				status: "pending",
			});
			return { status: 200, data: relation };
		} catch (error) {
			// next(error);
			return { error: true, status: 500, errMsg: error.message };
		}
	}

	async acceptFriendRequest({
		userId,
		relationId,
	}: {
		userId: string;
		relationId: string;
	}): Promise<TSuccess | TError> {
		try {
			// check that the relation exists and user is not the sender
			const relation = await relationRepository.findByIdAndUserId({
				relationId,
				userId,
			});

			if (!relation) {
				return { error: true, status: 404, errMsg: "Relation not found" };
			}

			// check that the user is not the sender
			const userIstheSender = relation.sender.toString() === userId;
			if (userIstheSender) {
				return { error: true, status: 401, errMsg: "Not Authorised" };
			}

			// update the relation
			relation.status = "accepted";
			relation.save();
			return { status: 200, data: relation };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}

	async declineFriendRequest({
		userId,
		relationId,
	}: {
		userId: string;
		relationId: string;
	}): Promise<TSuccess | TError> {
		try {
			// check that the relation exists
			const relation = await relationRepository.findByIdAndUserId({
				relationId,
				userId,
			});
			if (!relation) {
				return { error: true, status: 404, errMsg: "Not found" };
			}

			// check that the user is not the sender
			const userIstheSender = relation.sender.toString() === userId;
			if (userIstheSender) {
				return { error: true, status: 401, errMsg: "UnAuthorised" };
			}

			// update the relation
			relation.status = "declined";
			await relation.save();

			return { status: 200, data: relation };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}

	async findRelationsByStatus({
		userId,
		status,
	}: {
		userId: string;
		status: TRelation["status"];
	}): Promise<TSuccess | TError> {
		try {
			const relations = await relationRepository.findAllByStatus({
				userId,
				status,
			});
			if (!relations) {
				return { error: true, status: 404, errMsg: "not found" };
			}
			return { status: 200, data: relations };
		} catch (error) {
			return { error: true, status: 500, errMsg: error.message };
		}
	}
}

export const relationService = new RelationService();
