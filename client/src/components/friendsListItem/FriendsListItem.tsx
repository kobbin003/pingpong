import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "../modal/ProfileModal";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import { TRelation } from "../../types/relation";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";

type Props = { item: TRelation };

const FriendsListItem = ({ item }: Props) => {
	const { participants } = item;
	const { uid } = useSelector((state: RootState) => state.user);
	const profileModalRef = useRef<HTMLDialogElement>(null);

	const { setShowConversation } = useContext(ShowConversationContext);

	const showProfileModal = () => {
		if (profileModalRef.current) {
			profileModalRef.current.showModal();
		}
	};
	const contact = participants.filter(
		// instead of item.sender it should be current user id.
		(user) => user._id !== uid
	)[0];
	const handleChatSelection = () => {
		setShowConversation(true);
	};
	return (
		<>
			{/* <li className="my-2 flex items-center">
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
				</Link>
			</li> */}
			<li className="my-2 flex items-center text-sm border-b border-b-black/10 pb-2">
				<Link
					to=""
					// to={`/user/chat/${chatId}`}
					className="flex gap-2"
					onClick={handleChatSelection}
					state={{
						contact: contact.name,
						profilePicUrl: contact.profilePicUrl,
					}}
				>
					<div className=" flex items-center">
						<img
							src={contact.profilePicUrl || "/src/assets/defaultProfilePic.svg"}
							alt=""
							className=" h-12 w-12"
							// className="h-14 w-14"
							onClick={showProfileModal}
						/>
					</div>
					<div className="flex flex-col gap-1">
						<p>{contact.name}</p>
						<p className="">{contact.status}</p>
						{/* <p className=" max-w-[220px] truncate overflow-hidden">{status}</p> */}
					</div>
				</Link>
			</li>
			<ProfileModal ref={profileModalRef} />
		</>
	);
};

export default FriendsListItem;
