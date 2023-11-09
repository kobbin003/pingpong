import mongoose, { mongo } from "mongoose";

const chatSchema = new mongoose.Schema(
	{
		participants: {
			type: [
				{ type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
			],
		},
	},
	{ timestamps: true }
);

// Add a pre-save hook to validate the participants
chatSchema.pre("validate", function (next) {
	if (this.participants.length !== 2) {
		console.log("not two");
		return next(new Error("Exactly two participants are required."));
	}
	console.log("two");
	next();
});

export const ChatModel = mongoose.model("chat", chatSchema);
