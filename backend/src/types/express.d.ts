import { Request } from "express";

declare global {
	namespace Express {
		interface Request {
			firebaseId: string; // You can replace 'string' with the actual type of req.user
			name: string;
			email: string;
			email_verified: boolean;
			profilePicUrl: string;
		}
	}
}
