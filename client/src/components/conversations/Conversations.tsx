import { Suspense, lazy } from "react";
// import { ShowConversationContext } from "../../pages/userChats/UserChats";
// import Conversation from "./component/conversation/Conversation";
import { useParams } from "react-router-dom";
import Welcome from "../Welcome/Welcome";
// import MsgSendForm from "../msgSendForm/MsgSendForm";

const Conversation = lazy(
	() => import("./component/conversation/Conversation")
);

const MsgSendForm = lazy(() => import("../msgSendForm/MsgSendForm"));

const Conversations = () => {
	const { id } = useParams();
	// console.log("param", param);
	// const { setShowConversation, showConversation } = useContext(
	// 	ShowConversationContext
	// );

	// const [newUserWithNoFriend, setNewUserWithNoFriend] = useState(false);

	// useEffect(() => {
	// 	/* check if user has friends */
	// 	setNewUserWithNoFriend(true);
	// }, []);
	return (
		<div className="relative  flex-1">
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
