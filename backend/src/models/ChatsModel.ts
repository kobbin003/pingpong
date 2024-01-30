import mongoose from "mongoose";

export type TChat = {
	// _id: mongoose.Types.ObjectId;
	relation: mongoose.Types.ObjectId;
	// createdAt: Date;
	// updatedAt: Date;
};

const chatSchema = new mongoose.Schema<TChat>(
	{
		relation: { type: mongoose.Schema.Types.ObjectId, ref: "relationship" },
	},
	{ timestamps: true }
);
chatSchema.pre("validate", function () {});

export const ChatModel = mongoose.model<TChat>("chat", chatSchema);
