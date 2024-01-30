import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";

/** This middleware is for route protection */

export const firebaseAuth = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// const accessToken = req.query.token as string;
	const accessToken = req.headers.authorization.split(" ")[1];

	try {
		if (accessToken) {
			const decodedToken = await admin.auth().verifyIdToken(accessToken);
			req.firebaseId = decodedToken.uid;
		} else {
			console.log("token not found");
			throw new Error("not authorised");
		}
		next();
	} catch (error) {
		next(error);
	}
};
