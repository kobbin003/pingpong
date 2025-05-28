import mongoose from "mongoose";

export type TRelation = {
	// _id: mongoose.Schema.Types.ObjectId;
	participants: string[];
	sender: string;
	status: "pending" | "accepted" | "declined";
	// createdAt: Date;
	// updatedAt: Date;
};

const relationSchema = new mongoose.Schema<TRelation>(
	{
		participants: [{ type: String, ref: "user", required: true }],
		sender: {
			type: String,
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

relationSchema.virtual("chat", {
	ref: "chat",
	localField: "_id", // field in Relation
	foreignField: "relation", // field in Chat
	justOne: true, // one-to-one
});

// Make sure virtuals are included in JSON output
relationSchema.set("toJSON", { virtuals: true });
relationSchema.set("toObject", { virtuals: true });

export const RelationModel = mongoose.model<TRelation>(
	"relationship",
	relationSchema
);
