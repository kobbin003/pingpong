import mongoose from "mongoose";

export type TUser = {
	_id: mongoose.Schema.Types.ObjectId;
	name: string;
	email: string;
	password: string;
	profilePicUrl?: string;
	desc?: string;
	createdAt: Date;
	updatedAt: Date;
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
