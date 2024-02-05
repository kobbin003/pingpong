import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "../modal/ProfileModal";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import { TRelation } from "../../types/relation";

type Props = { item: TRelation };

const FriendsListItem = ({ item }: Props) => {
	const { setShowConversation } = useContext(ShowConversationContext);

	const profileModalRef = useRef<HTMLDialogElement>(null);

	const showProfileModal = () => {
		if (profileModalRef.current) {
			profileModalRef.current.showModal();
		}
	};
	const contact = item.participants.filter(
		(user) => user._id !== item.sender
	)[0];
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
					to={`/user/chat/${contact._id}`}
					className=""
					onClick={() => {
						setShowConversation(true);
					}}
				>
					{contact.name}
					{/* FriendsListItem-{item} */}
				</Link>
			</li>
			<ProfileModal ref={profileModalRef} />
		</>
	);
};

export default FriendsListItem;
