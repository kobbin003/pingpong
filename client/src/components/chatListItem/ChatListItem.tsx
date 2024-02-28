import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ProfileModal from "../modal/ProfileModal";
import { ShowConversationContext } from "../../context/ShowConversationProvider";
import { TChat } from "../../types/chat";
import { useGetUnreadMessagesQuery } from "../../api/message";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useGetMessageByChatIdQuery } from "../../api/chats";
import { MsgListItem, SocketContext } from "../../context/SocketProvider";

type Props = { chat: TChat };

const ChatListItem = ({ chat }: Props) => {
	const {
		_id: chatId,
		relation: { participants },
	} = chat;
	const { name, profilePicUrl } = participants[0];
	// console.log("profile pic url", profilePicUrl);
	const { setShowConversation } = useContext(ShowConversationContext);

	const profileModalRef = useRef<HTMLDialogElement>(null);

	const showProfileModal = (e: MouseEvent<HTMLImageElement>) => {
		// console.log("e-modal", e);
		e.stopPropagation();
		e.preventDefault();
		if (profileModalRef.current) {
			profileModalRef.current.showModal();
		}
	};

	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { isLoading, data, error } = useGetUnreadMessagesQuery({
		accessToken,
		chatId,
	});
	if (error) {
		console.log("get-unread-msg-error", error);
	}
	// console.log("unread-messages", data, isLoading);

	const msgs = useGetMessageByChatIdQuery({
		accessToken,
		chatId,
		offset: 0,
		limit: 1,
	}); // get only the latest message

	const { msgList } = useContext(SocketContext);
	const [roomMsgList, setRoomMsgList] = useState<MsgListItem[]>([]);

	useEffect(() => {
		// filter msgList based on the roomId for each ChatListItem.
		setRoomMsgList(() => {
			return msgList.filter((msg) => msg.roomId == chatId);
		});
		// console.log("msgList", msgList);
	}, [msgList]);

	const handleChatSelection = () => {
		setShowConversation(true);
	};
	return (
		<>
			<li className="my-2 flex items-center text-sm border-b border-b-black/10 pb-2 ">
				<Link
					to={`/user/chat/${chatId}`}
					className="flex gap-2 w-full"
					onClick={handleChatSelection}
					state={{ contact: name, profilePicUrl }}
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
					<div className="flex flex-col gap-1  w-full">
						<div>{name}</div>
						<div className="">
							{isLoading ? (
								<p>Loading...</p>
							) : (
								<div className="flex justify-between pr-2">
									<p className="text-gray-500/70 italic">
										{msgs.isLoading && "Loading..."}
										{/* if socket msg(msgList) show last message from it
											else show last message from fetched messages */}
										{roomMsgList.length > 0
											? roomMsgList[roomMsgList.length - 1].message
											: msgs.data && msgs.data[0]?.message
											? msgs.data[0]?.message
											: "empty"}
									</p>
									{data && data.length > 0 && (
										<p className="rounded-full bg-green-400">{data.length}</p>
									)}
								</div>
							)}
						</div>
					</div>
				</Link>
			</li>
			<ProfileModal ref={profileModalRef} />
		</>
	);
};

export default ChatListItem;
