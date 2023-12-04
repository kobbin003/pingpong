import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "../config";

export const emailLinkLogin = () => {
	const locationref = window.location.href;
	if (isSignInWithEmailLink(auth, locationref)) {
		console.log("yes");
		let email = localStorage.getItem("emailForSignIn");
		if (!email) {
			email = window.prompt("please provide your email");
		}
		// let email = window.prompt("please provide your email");
		if (email) {
			signInWithEmailLink(auth, email, locationref).then((result) => {
				// const {
				//     accessToken,
				// 	displayName,
				// 	email,
				// 	phoneNumber,
				// 	photoURL,
				// 	uid,
				// 	refreshToken,
				// } = result.user;
				console.log("result", result.user);
			});
		}
	}
};
