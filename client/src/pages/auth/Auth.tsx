import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store/store";
import { useEffect } from "react";
import { emptyErrorMsg } from "../../redux/reducers/alertSlice";
import AuthForm from "../../components/AuthForm";
import AuthButton from "../../components/AuthButton/AuthButton";

type Props = {};

const Auth = (_: Props) => {
	const { pathname } = useLocation();

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const alert = useSelector((state: RootState) => state.alert);

	const handleGoogleAuth = () => {
		/** google login: 
         * //*  set the user in redux state
					dispatch(setUser(userInfo));

					//* navigate to app
					navigate(`/in/${uid}`);
                    //* empty error on success
					dispatch(emptyErrorMsg());
            failure:
            console.log("google login error", err);
				dispatch(setErrorMsg("your google account not found"));
        */
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
		<div className="">
			{alert.errorMessage && <p>Error Alert</p>}
			<div className="">
				<div>LOGO</div>
				{!pathname.includes("login") ? (
					<>
						<AuthForm type="Signup" />
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
							<Link
								to={`/login`}
								className=""
							>
								Log in
							</Link>
						</div>
					</>
				) : (
					<>
						<AuthForm type="Login" />
						<div className=""></div>
						<div className="">
							<p>Don't have an account?</p>{" "}
							<Link
								to={`/`}
								className=""
							>
								Sign up
							</Link>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Auth;
