import { useSelector } from "react-redux";
import ChatListItem from "../chatListItem/ChatListItem";
import { RootState } from "../../redux/store/store";
import { useGetUserChatsQuery } from "../../api/chats";

type Props = {};

const ChatsList = ({}: Props) => {
	//* fetch user chats
	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { data, error, isLoading } = useGetUserChatsQuery({ accessToken });
	// console.log("chats", data, error, isLoading);
	return (
		<ul className="list-none">
			{data && data.map((chat) => <ChatListItem chat={chat} key={chat._id} />)}
		</ul>
	);
};

export default ChatsList;
