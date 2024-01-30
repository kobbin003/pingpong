// import passport from "passport";
// // import JwtStrategy from "passport-jwt";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import "dotenv/config";

// import { Jwtpayload } from "../types/JwtPayload";
// import { User } from "../types/User";
// import { UserModel } from "../models/UserModel";

// export const initializePassportWithJwtStrategy = () => {
// 	// console.log("initialise-strategy", process.env.JWT_PRIVATE_KEY);
// 	const opts = {
// 		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
// 		secretOrKey: process.env.JWT_PRIVATE_KEY, // Replace with your actual secret key
// 	};
// 	// opts.secretOrKey = 'secret';
// 	// opts.issuer = 'accounts.examplesoft.com';
// 	// opts.audience = 'yoursite.net';

// 	/** jwt_payload is equal to the payload used for generating jwtokten */
// 	const authenticate = async (jwt_payload: Jwtpayload, done: any) => {
// 		console.log("jwt_payload", jwt_payload);
// 		try {
// 			// const foundUser = await UserModel.findOne({ id: jwt_payload.id });
// 			const foundUser = await UserModel.findById(jwt_payload.id);
// 			if (!foundUser) {
// 				// console.log("user-not-found");
// 				return done(null, false, { message: "user not authorised" });
// 			}
// 			const { _id, name, email, createdAt } = foundUser;
// 			const user: User = { id: _id.toString(), name, email, createdAt };
// 			// console.log("userfound", user);
// 			return done(null, user);
// 		} catch (error) {
// 			// console.log("some error", error);
// 			return done(error, false);
// 		}
// 	};

// 	passport.use(new Strategy(opts, authenticate));
// };
