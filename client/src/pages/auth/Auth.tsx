import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { emptyErrorMsg, setErrorMsg } from "../../redux/reducers/alertSlice";
import AuthButton from "../../components/AuthButton/AuthButton";
import googleLogin from "../../firebase/authHandlers/googleLogin";
import { setUser } from "../../redux/reducers/userSlice";
import EmailLinkForm from "../../components/authform/EmailLinkForm";

type Props = {};

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
					const { displayName, email, photoURL, phoneNumber, uid } = res;

					// add "USD" as default currency
					const userInfo = {
						displayName,
						email,
						photoURL,
						phoneNumber,
						uid,
					};

					//*  set the user in redux state
					dispatch(setUser(userInfo));

					//* navigate to app
					navigate(`/user/chat/:id`);

					//*  skip adding the user in database if already present.
					// email &&
					// 	getUser(email).then((res) => {
					// 		const userWithEmailExists =
					// 			res?.docs.length && res?.docs.length > 0;
					// 		if (!userWithEmailExists) {
					// 			//*  add the user in firestore if a user with email does not exist.
					// 			addUser(userInfo);
					// 		}
					// 	});

					//* empty error on success
					dispatch(emptyErrorMsg());
				}
			})
			.catch((err) => {
				console.log("google login error", err);
				dispatch(setErrorMsg("your google account not found"));
			});
	};

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
					<div className="">
						<p>Already have an account?</p>{" "}
						<Link to={`/login`} className="">
							Log in
						</Link>
					</div>
				</>
			</div>
		</div>
	);
};

export default Auth;
