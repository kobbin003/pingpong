import {
	GoogleAuthProvider,
	// getAdditionalUserInfo,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../config";

const provider = new GoogleAuthProvider();

auth.useDeviceLanguage();

export default async function googleLogin() {
	try {
		const result = await signInWithPopup(auth, provider);
		const credential = GoogleAuthProvider.credentialFromResult(result);
		if (credential) {
			const user = result.user;
			// IdP data available using getAdditionalUserInfo(result)
			// ...
			// console.log("credential", credential);
			return user;
			// console.log(getAdditionalUserInfo(result));
		}
	} catch (error) {
		throw error;
	}
}
