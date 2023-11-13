import mongoose from "mongoose";

export type TRelation = {
	_id: mongoose.Schema.Types.ObjectId;
	sender: mongoose.Schema.Types.ObjectId;
	recipient: mongoose.Schema.Types.ObjectId;
	status: "Pending" | "Accepted" | "Declined";
};

const relationSchema = new mongoose.Schema<TRelation>(
	{
		sender: { type: mongoose.Types.ObjectId, ref: "user", required: true },
		recipient: { type: mongoose.Types.ObjectId, ref: "user", required: true },
		status: { type: String, enum: ["Pending", "Accepted", "Declined"] },
	},
	{
		timestamps: true,
	}
);

export const RelationModel = mongoose.model<TRelation>(
	"relationship",
	relationSchema
);
