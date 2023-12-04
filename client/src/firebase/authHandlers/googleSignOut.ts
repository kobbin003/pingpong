import { signOut } from "firebase/auth";
import { auth } from "../config";

export const googleSignOut = () => {
	try {
		signOut(auth);
	} catch (error) {
		throw error;
	}
};
