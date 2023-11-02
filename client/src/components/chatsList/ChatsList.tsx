import ChatListItem from "../chatListItem/ChatListItem";

type Props = {};

const ChatsList = ({}: Props) => {
	return (
		<ul className="list-none">
			{[1, 2, 3, 4].map((item) => (
				<ChatListItem
					item={item}
					key={item}
				/>
			))}
		</ul>
	);
};

export default ChatsList;
