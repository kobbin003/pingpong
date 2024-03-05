import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../context/SocketProvider";
import { auth } from "../../firebase/config";
import { removeUser } from "../../redux/reducers/userSlice";
import { removeAccessToken } from "../../redux/reducers/authSlice";
import { removeModalProfile } from "../../redux/reducers/modalSlice";

const Signout = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { disconnectClient } = useContext(SocketContext);
	const handleSignout = () => {
		auth.signOut();
		// empty redux state
		dispatch(removeUser());
		dispatch(removeAccessToken());
		dispatch(removeModalProfile());
		// go to auth page
		navigate("/");
		// disconnect socket connection when
		disconnectClient();
	};
	return (
		<button
			onClick={handleSignout}
			className="right-0 btn btn-xs md:btn-sm rounded-none lowercase font-medium"
		>
			signout
		</button>
	);
};

export default Signout;
