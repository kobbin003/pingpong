import mongoose from "mongoose";

export type TMessage = {
	_id: mongoose.Schema.Types.ObjectId;
	message: string;
	sender: mongoose.Schema.Types.ObjectId;
	chat: mongoose.Schema.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
};

const messageSchema = new mongoose.Schema<TMessage>(
	{
		message: {
			type: String,
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "user",
			required: true,
		},
		chat: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "chat",
			required: true,
		},
	},
	{ timestamps: true }
);

export const MessageModel = mongoose.model<TMessage>("message", messageSchema);
