import ChatListItem from "../chatListItem/ChatListItem";

type Props = {};

const ChatsList = ({}: Props) => {
	const fetchedUserChats = [1, 2, 3, 4];
	return (
		<ul className="list-none">
			{fetchedUserChats.map((item) => (
				<ChatListItem item={item} key={item} />
			))}
		</ul>
	);
};

export default ChatsList;
