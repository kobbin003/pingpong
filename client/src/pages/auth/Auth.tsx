import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { emptyErrorMsg, setErrorMsg } from "../../redux/reducers/alertSlice";
import AuthButton from "../../components/AuthButton/AuthButton";
import googleLogin from "../../firebase/authHandlers/googleLogin";
import EmailLinkForm from "../../components/authform/EmailLinkForm";
import {
	removeAccessToken,
	setAccessToken,
} from "../../redux/reducers/authSlice";
import { removeUser } from "../../redux/reducers/userSlice";
import googleIcon from "../../assets/google.svg";

const Auth = () => {
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const alert = useSelector((state: RootState) => state.alert);
	// console.log("alert", alert);

	const handleGoogleAuth = () => {
		googleLogin()
			.then((res) => {
				if (res) {
					const { accessToken } = res;
					// res.getIdToken().then((token) => {
					dispatch(setAccessToken(accessToken));
					// console.log("token", token);
					//*  set the user in redux state
					// dispatch(setUser(userInfo));

					//* navigate to app
					navigate(`/user/chat/welcome`);

					//* empty error on success
					dispatch(emptyErrorMsg());
					// });
				}
			})
			.catch((err) => {
				console.log("google login error", err);
				dispatch(setErrorMsg("could not login"));
			});
	};

	//* empty error on start
	useEffect(() => {
		dispatch(emptyErrorMsg());
		//* remove accessToken and user info once one lands into this page.
		dispatch(removeAccessToken());
		dispatch(removeUser());
	}, []);

	//* empty error on path change.
	useEffect(() => {
		dispatch(emptyErrorMsg());
	}, [pathname]);

	return (
		<div className="w-screen h-screen flex justify-center items-center bg-white text-black/80">
			{alert.errorMessage && <p>Error Alert:{alert.errorMessage}</p>}
			<div className="border border-gray-300 p-8 rounded-md">
				<div className="py-2">
					<img src="/pingpong.png" alt="logo" width={150} />
				</div>
				<>
					<EmailLinkForm />

					<div className="w-full flex items-center py-2">
						<div className="flex-1 h-0 border-b-2 border-gray-500"></div>
						<div className="px-2">or</div>
						<div className="flex-1 h-0 border-b-2 border-gray-500"></div>
					</div>
					<AuthButton
						bgColor=""
						img={googleIcon}
						desc="Continue with Google"
						onClick={handleGoogleAuth}
					/>
					<div className=""></div>
				</>
			</div>
		</div>
	);
};

export default Auth;
