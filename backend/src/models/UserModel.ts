import mongoose from "mongoose";

export type TUser = {
	_id: mongoose.Schema.Types.ObjectId;
	name: mongoose.Schema.Types.ObjectId;
	email: mongoose.Schema.Types.ObjectId;
	password: mongoose.Schema.Types.ObjectId;
	profilePicUrl?: string;
	desc?: string;
};

const userSchema = new mongoose.Schema<TUser>(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		password: { type: String, required: true },
		profilePicUrl: { type: String },
		desc: { type: String },
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model<TUser>("user", userSchema);
