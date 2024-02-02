import { useEffect } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { useDispatch } from "react-redux";
import { emptyErrorMsg, setErrorMsg } from "../redux/reducers/alertSlice";
import { setAccessToken } from "../redux/reducers/authSlice";
type Props = {};
/** Used with EMail link login */

const LogIn = ({}: Props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
					.then((res) => {
						const { accessToken } = res.user;
						dispatch(setAccessToken(accessToken));
					})
					.then(() => {
						//* navigate to app
						navigate(`/user/chat/welcome`);

						//* empty error on success
						dispatch(emptyErrorMsg());
					})
					.catch((err) => {
						console.log("google login error", err);
						// since using email link will take you to login
						// go back to auth page if there is any error.
						navigate("/");
						dispatch(setErrorMsg("Could not login"));
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
