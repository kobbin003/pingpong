import { NextFunction, Request, Response } from "express";
import { RelationModel, TRelation } from "../../models/RelationModel";
import { User } from "../../types/User";

// params: status
// status can be : "accepted", "pending" or "declined"
export const getFriends = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = req.params.status as TRelation["status"];

	const user = req.user as User;

	const userId = user.id;

	try {
		const relations = await RelationModel.find({ status })
			.where("participants")
			.in([userId]);

		if (relations.length < 1) {
			res.status(200).json([]);
		}

		res.status(200).json(relations);
	} catch (error) {
		res.status(500);
		// pass the error to the errorhandler
		next(error);
	}
};
