import mongoose, { Mongoose } from "mongoose";
import { string } from "zod";

const messageSchema = new mongoose.Schema(
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

export const MessageModel = mongoose.model("message", messageSchema);
