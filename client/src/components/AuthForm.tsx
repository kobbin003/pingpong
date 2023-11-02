import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setErrorMsg } from "../redux/reducers/alertSlice";
import AuthButton from "./AuthButton/AuthButton";

type UserFormType = { email: string; password: string };

const AuthForm = ({ type }: { type: "Login" | "Signup" }) => {
	const dispatch = useDispatch();

	const { pathname } = useLocation();

	const navigate = useNavigate();

	const initialFormData = {
		email: "",
		password: "",
	};
	const [formData, setFormData] = useState<UserFormType>(initialFormData);

	const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData((prev) => ({ ...prev, [inputName]: inputValue }));
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// if (!formData.email) {
		// 	dispatch(setErrorMsg("please provide email"));
		// 	return;
		// }
		// if (!formData.password) {
		// 	dispatch(setErrorMsg("please provide password"));
		// 	return;
		// }
		if (type == "Login") {
			navigate(`/user`);
			/** 
                 * login: after:
                 * //*  set the user in redux state
					dispatch(setUser(userInfo));
					//* navigate to app
					navigate(`/in/${uid}`);
					//* empty error on success
					dispatch(emptyErrorMsg());

                    login: failure:
                    console.log("email login error", err);
					dispatch(setErrorMsg("invalid credentials"));
                 */
		} else {
			/** signup: after:
             * //*  add the user in firestore
					addUser(userInfo);
					//*  set the user in redux state
					dispatch(setUser(userInfo));
					//* navigate to app
					navigate(`/in/${uid}`);
					//* empty error on success
					dispatch(emptyErrorMsg());

                    failure: 
                    console.log("email signup error", err);
					dispatch(setErrorMsg(err.message));
             */
		}
	};

	//* reset formData on path change.
	useEffect(() => {
		setFormData(initialFormData);
	}, [pathname]);

	return (
		<form
			onSubmit={handleSubmit}
			className="form-control gap-2"
		>
			<input
				type="email"
				name="email"
				value={formData.email}
				placeholder="email"
				onChange={handleOnChange}
				className="border-2 focus:outline-none border-gray-400 rounded-sm p-1"
			/>
			<input
				type="password"
				name="password"
				value={formData.password}
				placeholder="password"
				onChange={handleOnChange}
				className="border-2 focus:outline-none border-gray-400 rounded-sm p-1"
			/>
			<AuthButton
				bgColor="bg-orange-400"
				img="/src/assets/mail.svg"
				desc={type}
			/>
		</form>
	);
};

export default AuthForm;
