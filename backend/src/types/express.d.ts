import { Request } from "express";
import { Types } from "mongoose";
// import { ObjectId } from "mongoose";

declare global {
	namespace Express {
		interface Request {
			firebaseId: string;
			user: {
				name: string;
				email: string;
				email_verified: boolean;
				profilePicUrl: string;
			};
		}
	}
}
