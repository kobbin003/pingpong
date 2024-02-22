import { useContext } from "react";
// import { ShowConversationContext } from "../../pages/userChats/UserChats";
import Conversation from "./component/conversation/Conversation";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import Welcome from "../Welcome/Welcome";
import { useParams } from "react-router-dom";
import MsgSendForm from "../msgSendForm/MsgSendForm";

type Props = {};

const Conversations = ({}: Props) => {
	const { id } = useParams();
	// console.log("param", param);
	const { setShowConversation } = useContext(ShowConversationContext);

	// const [newUserWithNoFriend, setNewUserWithNoFriend] = useState(false);

	// useEffect(() => {
	// 	/* check if user has friends */
	// 	setNewUserWithNoFriend(true);
	// }, []);
	return (
		<div className="relative bg-blue-300/20 flex-1">
			<div className="bg-blue-500 flex justify-end">
				<button
					className="sm:hidden fixed btn"
					onClick={() => {
						console.log("clicked");
						setShowConversation((prev) => !prev);
					}}
				>
					back
				</button>
			</div>
			<div className="h-screen max-h-screen flex flex-col justify-between">
				{id == "welcome" ? <Welcome /> : <Conversation />}
				{id !== "welcome" && <MsgSendForm />}
			</div>
		</div>
	);
};

export default Conversations;
