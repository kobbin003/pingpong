import { NextFunction, Request, Response } from "express";
import { relationService } from "../service/relationService";
import { TRelation } from "../models/RelationModel";

class RelationController {
	async sendFriendRequest(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: senderId } = req;
		const recipientId = req.query.recipientId as string;
		try {
			const relation = await relationService.sendFriendRequest({
				senderId,
				recipientId,
			});
			if ("error" in relation) {
				res.status(relation.status);
				throw new Error(relation.errMsg);
			}
			res.status(relation.status).json(relation.data);
		} catch (error) {
			next(error);
		}
	}

	async acceptFriendRequest(req: Request, res: Response, next: NextFunction) {
		// recipient is the user
		const { firebaseId: userId } = req;
		const relationId = req.params.relationId;
		try {
			const relation = await relationService.acceptFriendRequest({
				relationId,
				userId,
			});
			if ("error" in relation) {
				res.status(relation.status);
				throw new Error(relation.errMsg);
			}
			res.status(relation.status).json(relation.data);
		} catch (error) {
			next(error);
		}
	}

	async declineFriendRequest(req: Request, res: Response, next: NextFunction) {
		const { firebaseId: userId } = req;
		const relationId = req.params.relationId;
		try {
			const relation = await relationService.declineFriendRequest({
				relationId,
				userId,
			});
			if ("error" in relation) {
				res.status(relation.status);
				throw new Error(relation.errMsg);
			}
			res.status(relation.status).json(relation.data);
		} catch (error) {
			next(error);
		}
	}

	async getRelationsByStatus(req: Request, res: Response, next: NextFunction) {
		const status = req.query.status as TRelation["status"];
		const { firebaseId: userId } = req;
		try {
			const relations = await relationService.findRelationsByStatus({
				userId,
				status,
			});
			if ("error" in relations) {
				res.status(relations.status);
				throw new Error(relations.errMsg);
			}
			res.status(relations.status).json(relations.data);
		} catch (error) {
			next(error);
		}
	}
}

export const relationController = new RelationController();
