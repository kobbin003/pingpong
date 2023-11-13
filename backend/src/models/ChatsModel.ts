import mongoose from "mongoose";

export type TChat = {
	_id: mongoose.Types.ObjectId;
	participants: mongoose.Types.ObjectId[];
	createdAt: Date;
	updatedAt: Date;
};

const chatSchema = new mongoose.Schema<TChat>(
	{
		participants: {
			type: [
				{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
			],
		},
	},
	{ timestamps: true }
);

// Add a pre-save hook to validate: exactly two participants should be present
chatSchema.pre("validate", function (next) {
	if (this.participants.length !== 2) {
		console.log("not two");
		return next(new Error("Exactly two participants are required."));
	}
	console.log("two");
	next();
});

export const ChatModel = mongoose.model<TChat>("chat", chatSchema);
