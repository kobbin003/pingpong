import { useContext, useEffect, useState } from "react";
// import { ShowConversationContext } from "../../pages/userChats/UserChats";
import Conversation from "./component/conversation/Conversation";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import Welcome from "../Welcome/Welcome";
import { useParams } from "react-router-dom";

type Props = {};

const Conversations = ({}: Props) => {
	const { id } = useParams();
	// console.log("param", param);
	const { setShowConversation } = useContext(ShowConversationContext);

	const [newUserWithNoFriend, setNewUserWithNoFriend] = useState(false);

	useEffect(() => {
		/* check if user hase friends */
		setNewUserWithNoFriend(true);
	}, []);

	return (
		<div className="bg-yellow-300 flex-1">
			<div className="bg-blue-500 flex justify-end">
				<button
					className="sm:hidden"
					onClick={() => {
						setShowConversation(false);
					}}
				>
					back
				</button>
			</div>
			{id == "welcome" ? <Welcome /> : <Conversation />}
		</div>
	);
};

export default Conversations;
