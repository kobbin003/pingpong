import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { ShowConversationContext } from "../../pages/userChats/UserChats";
import ProfileModal from "../modal/ProfileModal";

type Props = { item: number };

const ChatListItem = ({ item }: Props) => {
	const { setShowConversation } = useContext(ShowConversationContext);

	const profileModalRef = useRef<HTMLDialogElement>(null);

	const showProfileModal = () => {
		if (profileModalRef.current) {
			profileModalRef.current.showModal();
		}
	};

	return (
		<>
			<li className="my-2 flex items-center">
				<div>
					<img
						src="/src/assets/defaultProfilePic.svg"
						alt=""
						height={20}
						width={20}
						onClick={showProfileModal}
					/>
				</div>
				<Link
					to={`/user/chat/${item}`}
					className=""
					onClick={() => {
						setShowConversation(true);
					}}
				>
					ChatsListItem-{item}
				</Link>
			</li>
			<ProfileModal ref={profileModalRef} />
		</>
	);
};

export default ChatListItem;
