import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { emptyErrorMsg, setErrorMsg } from "../../redux/reducers/alertSlice";
import AuthButton from "../../components/AuthButton/AuthButton";
import googleLogin from "../../firebase/authHandlers/googleLogin";
import EmailLinkForm from "../../components/authform/EmailLinkForm";
import { setAccessToken } from "../../redux/reducers/authSlice";
import Trial from "../../components/Trial";

type Props = {};
// console.log("vite-base url", VITE_BASE_URL);
const Auth = (_: Props) => {
	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const alert = useSelector((state: RootState) => state.alert);
	console.log("alert", alert);

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
	//
	// useEffect(() => {
	// 	console.log("lazydata", result, lastPromiseInfo);
	// }, [result]);
	//* empty error on start
	useEffect(() => {
		dispatch(emptyErrorMsg());
	}, []);

	//* empty error on path change.
	useEffect(() => {
		dispatch(emptyErrorMsg());
	}, [pathname]);

	return (
		<div className="bg-slate-50">
			{alert.errorMessage && <p>Error Alert:{alert.errorMessage}</p>}
			{/* <button onClick={() => trigger()}>trigger welcom</button> */}
			<div className="">
				<div>LOGO</div>
				<>
					<EmailLinkForm />
					<div className="">
						<div className=""></div>
						<div className="">OR</div>
						<div className=""></div>
					</div>
					<AuthButton
						bgColor=""
						img="/src/assets/google.svg"
						desc="Continue with Google"
						onClick={handleGoogleAuth}
					/>
					<div className=""></div>
				</>
			</div>
			<Link to={`/user/chat/welcome`}>chat:id</Link>
			{/* <Trial /> */}
		</div>
	);
};

export default Auth;
