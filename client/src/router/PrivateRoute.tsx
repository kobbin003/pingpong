import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
type Props = { children: ReactNode };

const PrivateRoute = ({ children }: Props) => {
	const navigate = useNavigate();
	const auth = useSelector((state: RootState) => state.auth);
	useEffect(() => {
		// console.log("user-state", user.uid);
		const isAuthenticated = auth.accessToken;
		if (!isAuthenticated) {
			navigate("/");
			console.log("is not authenticated");
		}
	}, []);
	return <div>{children}</div>;
};

export default PrivateRoute;
