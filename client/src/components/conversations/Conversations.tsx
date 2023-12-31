import { useContext, useEffect, useState } from "react";
import { ShowConversationContext } from "../../pages/userChats/UserChats";
import Conversation from "./component/conversation/Conversation";

type Props = {};

const Conversations = ({}: Props) => {
	const { setShowConversation } = useContext(ShowConversationContext);
	const [newUserWithNoFriend, setNewUserWithNoFriend] = useState(false);
	useEffect(() => {
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
			{newUserWithNoFriend ? <p>Welcome</p> : <Conversation />}
		</div>
	);
};

export default Conversations;
