import { useDispatch } from "react-redux";
import ChatNav from "../../components/chatNav/ChatNav";
import Conversations from "../../components/conversations/Conversations";
import { ShowConversationProvider } from "../../context/ShowConversationProvider";
import { auth } from "../../firebase/config";
import { removeUser } from "../../redux/reducers/userSlice";
import { removeAccessToken } from "../../redux/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";

type Props = {};

export const ChatScreen = ({}: Props) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { disconnectClient } = useContext(SocketContext);
	const handleSignout = () => {
		auth.signOut();
		// empty redux state
		dispatch(removeUser());
		dispatch(removeAccessToken());
		// go to auth page
		navigate("/");
		// disconnect socket connection when
		disconnectClient();
	};

	return (
		<div className="flex flex-col h-screen" data-theme="cupcake">
			<button onClick={handleSignout} className="fixed z-20 right-0 btn">
				signout
			</button>

			<ShowConversationProvider>
				<div className="flex h-full">
					<ChatNav />
					<Conversations />
				</div>
			</ShowConversationProvider>
		</div>
	);
};
