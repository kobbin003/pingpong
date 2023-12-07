// import React from "react";
// import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { emailLinkLogin } from "../firebase/authHandlers/emailLinkLogin";
type Props = {};

const LoggedIn = ({}: Props) => {
	emailLinkLogin();
	return (
		<div>
			<p>congrats! you are Logged in</p>
		</div>
	);
};

export default LoggedIn;
