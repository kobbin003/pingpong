import { Suspense, lazy, useContext } from "react";
// import { ShowConversationContext } from "../../pages/userChats/UserChats";
// import Conversation from "./component/conversation/Conversation";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import Welcome from "../Welcome/Welcome";
import { useParams } from "react-router-dom";
// import MsgSendForm from "../msgSendForm/MsgSendForm";
import Signout from "../signout/Signout";

const Conversation = lazy(
	() => import("./component/conversation/Conversation")
);

const MsgSendForm = lazy(() => import("../msgSendForm/MsgSendForm"));
type Props = {};

const Conversations = ({}: Props) => {
	const { id } = useParams();
	// console.log("param", param);
	const { setShowConversation, showConversation } = useContext(
		ShowConversationContext
	);

	// const [newUserWithNoFriend, setNewUserWithNoFriend] = useState(false);

	// useEffect(() => {
	// 	/* check if user has friends */
	// 	setNewUserWithNoFriend(true);
	// }, []);
	return (
		<div className="relative bg-blue-300/20 flex-1">
			<div className=" fixed z-50 right-0 h-12 flex gap-1 items-center justify-end pr-2">
				{showConversation && (
					<button
						className="sm:hidden btn btn-xs rounded-none lowercase font-medium"
						onClick={() => {
							console.log("clicked");
							setShowConversation(false);
						}}
					>
						chats
					</button>
				)}
				<Signout />
			</div>
			<div className="h-screen max-h-screen flex flex-col justify-between">
				{id == "welcome" ? (
					<Welcome />
				) : (
					<Suspense fallback={<>Loading...</>}>
						<Conversation />
					</Suspense>
				)}
				{id !== "welcome" && (
					<Suspense fallback={<>Loading...</>}>
						<MsgSendForm />
					</Suspense>
				)}
			</div>
		</div>
	);
};

export default Conversations;
