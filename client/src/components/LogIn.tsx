// import React from "react";
// import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
type Props = {};

const LogIn = ({}: Props) => {
	const navigate = useNavigate();
	useEffect(() => {
		const locationref = window.location.href;
		if (isSignInWithEmailLink(auth, locationref)) {
			console.log("yes");
			let email = localStorage.getItem("emailForSignIn");
			if (!email) {
				email = window.prompt("please provide your email");
			}
			if (email) {
				signInWithEmailLink(auth, email, locationref)
					.then((result) => {
						const {
							// accessToken,
							displayName,
							email,
							phoneNumber,
							photoURL,
							uid,
							refreshToken,
						} = result.user;
						console.log(
							"result",
							// accessToken,
							displayName,
							email,
							phoneNumber,
							photoURL,
							uid,
							refreshToken,
							result
						);
					})
					.then(() => {
						navigate("/user/chat/welcome");
					});
			}
		}
	}, []);
	return (
		<div>
			<p>Loading...</p>
		</div>
	);
};

export default LogIn;
