import { MouseEvent, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "../modal/ProfileModal";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import { TChat } from "../../types/chat";

type Props = { chat: TChat };

const ChatListItem = ({ chat }: Props) => {
	const {
		_id: chatId,
		relation: { participants },
	} = chat;

	const { setShowConversation } = useContext(ShowConversationContext);

	const profileModalRef = useRef<HTMLDialogElement>(null);

	const showProfileModal = (e: MouseEvent<HTMLImageElement>) => {
		console.log("e-modal", e);
		e.stopPropagation();
		e.preventDefault();
		if (profileModalRef.current) {
			profileModalRef.current.showModal();
		}
	};

	const handleChatSelection = () => {
		setShowConversation(true);
	};
	return (
		<>
			<li className="my-2 flex items-center">
				<Link
					to={`/user/chat/${chatId}`}
					className=""
					onClick={handleChatSelection}
				>
					<div>
						<img
							src="/src/assets/defaultProfilePic.svg"
							alt=""
							height={20}
							width={20}
							onClick={showProfileModal}
						/>
					</div>
					{participants[0].name}
				</Link>
			</li>
			<ProfileModal ref={profileModalRef} />
		</>
	);
};

export default ChatListItem;
