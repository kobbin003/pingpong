import mongoose from "mongoose";

const relationSchema = new mongoose.Schema(
	{
		sender: { type: mongoose.Types.ObjectId, required: true },
		recipient: { type: mongoose.Types.ObjectId, required: true },
		status: { type: String, enum: ["Pending", "Accepted", "Declined"] },
	},
	{
		timestamps: true,
	}
);

export const RelationModel = mongoose.model("relationship", relationSchema);
