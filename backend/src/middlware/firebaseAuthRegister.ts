import { NextFunction, Request, Response } from "express";
import admin from "firebase-admin";
import { Types } from "mongoose";
import { randomIdGenerator } from "../utils/randomIdGenerator";

/** This middleware is for route protection
 * as well as initial user creation
 */
export const firebaseAuthRegister = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	// const accessToken = req.query.token as string;
	const accessToken = req.headers.authorization.split(" ")[1];
	try {
		if (accessToken) {
			const decodedToken = await admin.auth().verifyIdToken(accessToken);
			console.log("decodedToken", decodedToken.uid);
			console.log("decodedName", decodedToken.name);
			req.firebaseId = decodedToken.uid;
			req.user = {
				name: decodedToken.name || `user_${randomIdGenerator()}`,
				email: decodedToken.email,
				email_verified: decodedToken.email_verified,
				profilePicUrl: decodedToken.picture || "", // use default image in the client side
			};
		} else {
			throw new Error("not authorised");
		}
		next();
	} catch (error) {
		next(error);
	}
};

// decodedToken {
// 	name: 'Kobin',
// 	picture: 'https://lh3.googleusercontent.com/a/ACg8ocI2dJJE3YXqoeMvhkr1kRy2ElZQfP9qvCA-6MD0SSSt=s96-c',
// 	iss: 'https://securetoken.google.com/ping-pong-5361a',
// 	aud: 'ping-pong-5361a',
// 	auth_time: 1706082878,
// 	user_id: 'JB5g3KLn5MPxAKKiRLPo22af3De2',
// 	sub: 'JB5g3KLn5MPxAKKiRLPo22af3De2',
// 	iat: 1706082878,
// 	exp: 1706086478,
// 	email: 'kobin369@gmail.com',
// 	email_verified: true,
// 	firebase: {
// 	  identities: { 'google.com': [Array], email: [Array] },
// 	  sign_in_provider: 'google.com'
// 	},
// 	uid: 'JB5g3KLn5MPxAKKiRLPo22af3De2'
//   }
