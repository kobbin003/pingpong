import mongoose, { Types } from "mongoose";

export type TUser = {
	_id: string; // firebaseId
	// _id: Types.ObjectId; // firebaseId
	// firebaseId: string;
	name: string;
	email: string;
	email_verified: boolean;
	// password: string;
	profilePicUrl?: string;
	status: string;
	// desc?: string;
	// createdAt: Date;
	// updatedAt: Date;
};

const userSchema = new mongoose.Schema<TUser>(
	{
		_id: { type: String, required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		email_verified: { type: Boolean, required: true },
		// password: { type: String, required: true },
		// firebaseId: { type: String, required: true },
		profilePicUrl: { type: String },
		status: { type: String, required: true },
		// desc: { type: String },
	},
	{
		timestamps: true,
	}
);

export const UserModel = mongoose.model<TUser>("user", userSchema);
