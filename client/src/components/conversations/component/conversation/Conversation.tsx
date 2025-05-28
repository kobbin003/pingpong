import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { useGetMessageByChatIdQuery } from "../../../../api/chats";
import { useGetUnreadMessagesQuery } from "../../../../api/message";
import defaultProfilePic from "../../../../assets/defaultProfilePic.svg";
import { SocketContext } from "../../../../context/SocketProvider";
import { setErrorMsg } from "../../../../redux/reducers/alertSlice";
import { RootState } from "../../../../redux/store/store";
import { TError } from "../../../../types/error";
import { TMessage } from "../../../../types/message";
import ChatBubble from "../../../chatbubble/ChatBubble";
import ProfileModal from "../../../modal/ProfileModal";
import { ShowConversationContext } from "@/context/ShowConversationProvider";
import { ChevronUp, Menu } from "lucide-react";
import Signout from "@/components/signout/Signout";

const LIMIT = 5;

const Conversation = () => {
	const { state } = useLocation() as {
		state: { contact: string; profilePicUrl: string };
	};
	// const [contact, setContact] = useState(state.contact);
	const contactRef = useRef(state.contact); // to track the initial state of the contact.

	// console.log("state", state);
	const { id } = useParams();

	// * messages are the messages fetched from the database
	const [messages, setMessages] = useState<TMessage[]>([]);
	const [page, setPage] = useState<number>(0);
	const [endOfMessage, setEndOfMessage] = useState(false);
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { setShowConversation, showConversation } = useContext(
		ShowConversationContext
	);

	//* msgList are messages that are passed through the socket connection.
	const { msgList, joinRoom, leaveRoom, setMsgList } =
		useContext(SocketContext);

	const paginate = () => {
		const newSocketMsgs = msgList.length;
		// offset will get incremented by the number of new socket messaages in current session/component-mount

		setPage((prev) => prev + newSocketMsgs + LIMIT);
		// console.log("socket messages", msgList.length);
	};

	const profileModalRef = useRef<HTMLDialogElement>(null);

	const showProfileModal = (e: MouseEvent<HTMLDivElement>) => {
		console.log("e-modal", e);
		e.stopPropagation();
		e.preventDefault();
		// set modalProfile

		if (profileModalRef.current) {
			profileModalRef.current.showModal();
		}
	};
	const { data, error, isLoading, currentData } = useGetMessageByChatIdQuery({
		accessToken,
		chatId: id || "",
		offset: page,
		limit: LIMIT,
	});

	const { refetch } = useGetUnreadMessagesQuery({
		accessToken,
		chatId: id || "",
	});

	// console.log("messages:::::: ", messages);
	// console.log("msgList:::::: ", msgList);

	// move the latest chatBubble on the screen if the content overflows
	// look for end message
	useEffect(() => {
		// console.log("currentData", currentData);
		if (currentData?.length == 0) {
			//TODO
			// set a message that this is the end of all the messages
			setEndOfMessage(true);
		}
	}, [currentData]);

	// update msgList on new data
	useEffect(() => {
		if (data) {
			const reversedData = [...data].reverse();
			// console.log("reversedData", reversedData);
			setMessages((prev) => {
				if (reversedData !== prev) {
					return [...reversedData, ...prev];
				}
				return prev;
			});
		}
	}, [data]);

	// resetting initial states
	useEffect(() => {
		if (id) {
			return () => {
				// resetting initial states
				// epmty msg list
				if (setMsgList) {
					setMsgList([]);
				}
				setMessages([]);
				setPage(0);
				setEndOfMessage(false);
			};
		}
	}, [id]);

	//room joining-leaving
	useEffect(() => {
		if (id) {
			// console.log("room joined", id);
			joinRoom(id);

			// re-fetch the unreadMessages; it should be empty by now.
			refetch();

			return () => {
				// console.log("room left", id);
				// console.log("change in id this is where I am supposed to save msgList");
				leaveRoom(id);
			};
		}
	}, [id]);

	if (error) {
		const myError = error as TError;
		// console.log("conversation error", error);
		// set error
		dispatch(setErrorMsg(myError.data.error.msg));
	}

	return (
		<div className="overflow-auto">
			{/* header */}
			<div className="fixed h-12 w-full text-sm gap-2 hover:cursor-pointer z-10 px-2 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-white">
				<div className="flex items-center gap-2">
					{showConversation && (
						<Menu
							color="grey"
							size={24}
							onClick={() => {
								console.log("clicked");
								setShowConversation(false);
							}}
						/>
					)}
					<div className="relative" onClick={showProfileModal}>
						<Avatar>
							<AvatarImage
								src={state.profilePicUrl || defaultProfilePic}
								alt={state.contact}
							/>
							<AvatarFallback>{state.contact.charAt(0)}</AvatarFallback>
						</Avatar>
						{/* {chat.status === "online" && (
						<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
					)} */}
					</div>
					<div className="ml-3">
						<p className="font-medium">{state.contact}</p>
					</div>
				</div>
				<div className="fixed right-2">
					<Signout />
				</div>
			</div>
			{/* profile modal */}
			<ProfileModal ref={profileModalRef} />
			{/* chatview */}
			<div className="pt-12 px-2 flex-1 p-4 overflow-y-auto ">
				{/* end of message section */}
				<div className="flex justify-center py-1">
					{endOfMessage ? (
						<p className="text-center w-max text-blue-400 font-normal py-2 text-sm tracking-wide">
							No more messages available
						</p>
					) : (
						<button
							onClick={paginate}
							className="text-center w-max text-blue-400 font-normal py-2 text-sm tracking-wide flex items-center gap-1"
						>
							<ChevronUp size={14} />
							view older messages
							<ChevronUp size={14} />
						</button>
					)}
				</div>
				{isLoading && <p>Loading...</p>}

				<ul className="flex flex-col gap-4">
					{messages.map((msg) => {
						const { message, createdAt, sender } = msg;
						// const { day, month, year } = dateFormatter(new Date(createdAt));
						return (
							<li key={msg._id} className="list-none">
								{/* <p className="self-center text-xs text-slate-400/80">
								{day}/{month}/{year}
							</p> */}
								<ChatBubble
									key={msg._id}
									msg={message}
									sender={{ id: sender, name: contactRef.current }}
									time={createdAt.toString()}
								/>
							</li>
						);
					})}
					{msgList &&
						msgList.length > 0 &&
						msgList.map((msg, index) => {
							return (
								<li
									key={msg + index.toString()}
									className="list-none flex flex-col"
								>
									{/* <p className="self-center text-xs text-slate-400/80">Today</p> */}
									<ChatBubble
										msg={msg.message}
										time={msg.createdAt}
										sender={{ id: msg.sender, name: contactRef.current }}
										isLastBubble={index == msgList.length - 1}
									/>
								</li>
							);
						})}
				</ul>
			</div>
		</div>
	);
};

export default Conversation;
