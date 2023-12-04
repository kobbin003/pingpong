import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const actionCodeSettings = {
	// URL you want to redirect back to. The domain (www.example.com) for this
	// URL must be in the authorized domains list in the Firebase Console.
	url: "http://localhost:5173/loggedin",
	// This must be true.
	handleCodeInApp: true,
};

export const sendEmailLinkLogin = (email: string) => {
	const auth = getAuth();
	sendSignInLinkToEmail(auth, email, actionCodeSettings)
		.then(() => {
			// The link was successfully sent. Inform the user.
			// Save the email locally so you don't need to ask the user for it again
			// if they open the link on the same device.
			window.localStorage.setItem("emailForSignIn", email);
			// ...
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			// ...
			console.log("login error", errorCode, errorMessage);
		});
};
