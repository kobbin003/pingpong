import { NextFunction, Request } from "express";
import admin from "firebase-admin";

console.log("route", __dirname);
// initializeApp({ credential: firebase.credential.cert() });

export const firebaseAuthRegister = async (req, res, next) => {
	const accessToken = req.query.token as string;
	// const accessToken = req.headers.authorization;
	try {
		if (accessToken) {
			const decodedToken = await admin.auth().verifyIdToken(accessToken);

			req.user = {
				firebaseId: decodedToken.uid,
				name: decodedToken.name,
				email: decodedToken.email,
				email_verified: decodedToken.email_verified,
				profilePicUrl: decodedToken.picture,
			};
		} else {
			throw new Error("not authorised");
		}
	} catch (error) {
		next(error);
	}
	next();
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