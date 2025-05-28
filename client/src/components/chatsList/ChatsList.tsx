import { useSelector } from "react-redux";
import ChatListItem from "../chatListItem/ChatListItem";
import { RootState } from "../../redux/store/store";
import { useGetUserChatsQuery } from "../../api/chats";

const ChatsList = () => {
	//* fetch user chats
	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { data, error, isLoading } = useGetUserChatsQuery({ accessToken });
	// console.log("chats", data, error, isLoading);
	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		console.log("ChatsList-error", error);
	}

	return (
		<ul className="list-none">
			{data && data.length > 0 ? (
				data.map((chat) => <ChatListItem chat={chat} key={chat._id} />)
			) : (
				<p>No chats available</p>
			)}
		</ul>
	);
};

export default ChatsList;
