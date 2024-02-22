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
	const { name, profilePicUrl, status } = participants[0];
	console.log("profile pic url", profilePicUrl);
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
			<li className="my-2 flex items-center text-sm border-b border-b-black/10 pb-2">
				<Link
					to={`/user/chat/${chatId}`}
					className="flex gap-2"
					onClick={handleChatSelection}
					state={{ contact: name }}
				>
					<div className=" flex items-center">
						<img
							src={profilePicUrl || "/src/assets/defaultProfilePic.svg"}
							alt=""
							className=" h-12 w-12"
							// className="h-14 w-14"
							onClick={showProfileModal}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<p>{name}</p>
						<p className="">{status}</p>
						{/* <p className=" max-w-[220px] truncate overflow-hidden">{status}</p> */}
					</div>
				</Link>
			</li>
			<ProfileModal ref={profileModalRef} />
		</>
	);
};

export default ChatListItem;
