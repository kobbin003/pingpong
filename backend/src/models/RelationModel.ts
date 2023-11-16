import mongoose from "mongoose";

export type TRelation = {
	_id: mongoose.Schema.Types.ObjectId;
	participants: mongoose.Schema.Types.ObjectId[];
	sender: mongoose.Schema.Types.ObjectId;
	status: "pending" | "accepted" | "declined";
	createdAt: Date;
	updatedAt: Date;
};

const relationSchema = new mongoose.Schema<TRelation>(
	{
		participants: [
			{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
		],
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		status: { type: String, enum: ["pending", "accepted", "declined"] },
	},
	{
		timestamps: true,
	}
);

// Add a pre-save hook to condition that exactly two participants should be present
relationSchema.pre("save", function (next) {
	if (this.participants.length !== 2) {
		console.log("not two");
		return next(new Error("Exactly two participants are required."));
	}
	console.log("two");
	next();
});

export const RelationModel = mongoose.model<TRelation>(
	"relationship",
	relationSchema
);
