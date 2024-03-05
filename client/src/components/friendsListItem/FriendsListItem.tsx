import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "../modal/ProfileModal";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import { TRelation } from "../../types/relation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { setModalProfile } from "../../redux/reducers/modalSlice";

type Props = { item: TRelation };

const FriendsListItem = ({ item }: Props) => {
	const { participants } = item;
	const { uid } = useSelector((state: RootState) => state.user);
	const profileModalRef = useRef<HTMLDialogElement>(null);

	const dispatch = useDispatch();
	const { setShowConversation } = useContext(ShowConversationContext);

	const showProfileModal = () => {
		dispatch(
			setModalProfile({
				name,
				profilePicUrl: profilePicUrl || "",
				email,
				status,
				email_verified,
				uid: _id,
			})
		);
		if (profileModalRef.current) {
			profileModalRef.current.showModal();
		}
	};
	const { email, _id, email_verified, name, status, profilePicUrl } =
		participants.filter(
			// instead of item.sender it should be current user id.
			(user) => user._id !== uid
		)[0];
	const handleChatSelection = () => {
		setShowConversation(true);
	};
	return (
		<>
			<li className="my-2 flex items-center text-sm border-b border-b-black/10 pb-2">
				<Link
					to=""
					// to={`/user/chat/${chatId}`}
					className="flex gap-2"
					onClick={handleChatSelection}
					state={{
						contact: name,
						profilePicUrl: profilePicUrl,
					}}
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

export default FriendsListItem;
