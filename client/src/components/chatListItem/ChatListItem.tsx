import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShowChatListContext } from "../../pages/Layout1/Layout1";

type Props = { item: number };

const ChatListItem = ({ item }: Props) => {
	const { setShowChatList } = useContext(ShowChatListContext);
	// console.log(context);
	return (
		<li className="my-2">
			<Link
				to={`/user/chat/${item}`}
				className="btn"
				onClick={() => {
					setShowChatList(false);
				}}
			>
				FriendsListItem-{item}
			</Link>
		</li>
	);
};

export default ChatListItem;
