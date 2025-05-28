import { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import defaultProfilePic from "../../assets/defaultProfilePic.svg";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import { setModalProfile } from "../../redux/reducers/modalSlice";
import { RootState } from "../../redux/store/store";
import { TRelation } from "../../types/relation";
import ProfileModal from "../modal/ProfileModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "react-router-dom";

type Props = { item: TRelation };

const FriendsListItem = ({ item }: Props) => {
	const { participants, chat } = item;
	const { uid } = useSelector((state: RootState) => state.user);
	const profileModalRef = useRef<HTMLDialogElement>(null);

	const dispatch = useDispatch();
	const { setShowConversation, setActiveTab } = useContext(
		ShowConversationContext
	);

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
		// console.log("chat-selection-clicked");
		setShowConversation(true);

		// also we have set the tab to chats
		setActiveTab("chats");
	};
	return (
		<>
			<li className="my-2 flex items-center text-sm pb-2">
				<div className="flex gap-2 items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer">
					<div className="relative cursor-pointer">
						<Avatar onClick={showProfileModal}>
							<AvatarImage src={profilePicUrl || defaultProfilePic} alt="" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
					</div>

					<Link
						// to={`#`}
						to={chat ? `/user/chat/${chat?._id}` : "#"}
						onClick={handleChatSelection}
						state={{
							contact: name,
							profilePicUrl: profilePicUrl,
						}}
						className=""
					>
						<p className="font-medium">{name}</p>
						<p className="text-sm text-gray-500 dark:text-gray-400 ">
							{status}
						</p>
					</Link>
				</div>
			</li>
			<ProfileModal ref={profileModalRef} />
		</>
	);
};
// const FriendsListItem = ({ item }: Props) => {
// 	const { participants } = item;
// 	const { uid } = useSelector((state: RootState) => state.user);
// 	const profileModalRef = useRef<HTMLDialogElement>(null);

// 	const dispatch = useDispatch();
// 	const { setShowConversation } = useContext(ShowConversationContext);

// 	const showProfileModal = () => {
// 		dispatch(
// 			setModalProfile({
// 				name,
// 				profilePicUrl: profilePicUrl || "",
// 				email,
// 				status,
// 				email_verified,
// 				uid: _id,
// 			})
// 		);
// 		if (profileModalRef.current) {
// 			profileModalRef.current.showModal();
// 		}
// 	};
// 	const { email, _id, email_verified, name, status, profilePicUrl } =
// 		participants.filter(
// 			// instead of item.sender it should be current user id.
// 			(user) => user._id !== uid
// 		)[0];
// 	const handleChatSelection = () => {
// 		setShowConversation(true);
// 	};
// 	return (
// 		<>
// 			<li className="my-2 flex items-center text-sm border-b border-b-black/10 pb-2">
// 				<Link
// 					to=""
// 					// to={`/user/chat/${chatId}`}
// 					className="flex gap-2"
// 					onClick={handleChatSelection}
// 					state={{
// 						contact: name,
// 						profilePicUrl: profilePicUrl,
// 					}}
// 				>
// 					<div className=" flex items-center">
// 						<img
// 							src={profilePicUrl || defaultProfilePic}
// 							alt=""
// 							className=" h-12 w-12"
// 							// className="h-14 w-14"
// 							onClick={showProfileModal}
// 						/>
// 					</div>
// 					<div className="flex flex-col gap-1">
// 						<p>{name}</p>
// 						<p className="">{status}</p>
// 						{/* <p className=" max-w-[220px] truncate overflow-hidden">{status}</p> */}
// 					</div>
// 				</Link>
// 			</li>
// 			<ProfileModal ref={profileModalRef} />
// 		</>
// 	);
// };

export default FriendsListItem;
