import { ChangeEvent, FormEvent, useState } from "react";
import { sendSignInLinkToEmail } from "firebase/auth";
import { useDispatch } from "react-redux";
import { setErrorMsg } from "../../redux/reducers/alertSlice";
import { auth } from "../../firebase/config";

type Props = {};

const EmailLinkForm = ({}: Props) => {
	const [email, setEmail] = useState("");
	const [linkSent, setLinkSent] = useState(false);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	const sendEmailLinkRequest = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// sendEmailLinkLogin(email);
		setLoading(true);

		const actionCodeSettings = {
			// URL you want to redirect back to. The domain (www.example.com) for this
			// URL must be in the authorized domains list in the Firebase Console.
			url: "http://localhost:5173/logIn",
			// This must be true.
			handleCodeInApp: true,
		};

		//* 1: sendSignInLinkToEmail
		sendSignInLinkToEmail(auth, email, actionCodeSettings)
			.then(() => {
				// The link was successfully sent. Inform the user.
				// Save the email locally so you don't need to ask the user for it again
				// if they open the link on the same device.
				window.localStorage.setItem("emailForSignIn", email);
				setLoading(false);
				setLinkSent(true);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setLoading(false);
				dispatch(setErrorMsg("failed to send the link. Please retry!"));
				console.log("login error", errorCode, errorMessage);
			});
	};
	const trackInputValueChange = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	return (
		<form onSubmit={sendEmailLinkRequest} className="flex flex-col gap-2">
			<input
				type="email"
				name=""
				id=""
				value={email}
				onChange={trackInputValueChange}
				className="input input-sm input-bordered rounded-sm bg-white"
			/>
			<button type="submit" className="bg-orange-400 py-1">
				send email link
			</button>
			{loading && <p>Loading...</p>}
			{linkSent && <p>we have sent sign-in link to you email</p>}
		</form>
	);
};

export default EmailLinkForm;
