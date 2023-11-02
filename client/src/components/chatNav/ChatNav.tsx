import { useState } from "react";
import ChatsList from "../chatsList/ChatsList";
import SearchFriends from "../searchFriends/SearchFriends";

type Props = {};

const ChatNav = ({}: Props) => {
	const [showfriendsList, setShowfriendsList] = useState(true);

	return (
		<div className="bg-red-300">
			<div className="flex gap-2">
				<button onClick={() => setShowfriendsList(true)}>friends</button>
				<button onClick={() => setShowfriendsList(false)}>search</button>
			</div>
			{showfriendsList ? <ChatsList /> : <SearchFriends />}
		</div>
	);
};

export default ChatNav;
