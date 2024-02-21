import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { RootState } from "../../../../redux/store/store";
import { useGetMessageByChatIdQuery } from "../../../../api/chats";
import { setErrorMsg } from "../../../../redux/reducers/alertSlice";
import { TError } from "../../../../types/error";
import { UIEvent, useContext, useEffect, useState } from "react";
import { SocketContext } from "../../../../context/SocketProvider";
import { TMessage } from "../../../../types/message";
import ChatBubble from "../../../chatbubble/ChatBubble";

type Props = {};
const LIMIT = 5;
const Conversation = ({}: Props) => {
	const { state } = useLocation() as { state: { contact: string } };
	const [contact, setContact] = useState(state.contact);
	// console.log("state", state);
	const { id } = useParams();
	const [messages, setMessages] = useState<TMessage[]>([]);
	const [page, setPage] = useState<number>(0);
	const [endOfMessage, setEndOfMessage] = useState(false);
	const dispatch = useDispatch();
	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { msgList, joinRoom, leaveRoom, setMsgList } =
		useContext(SocketContext);

	const paginate = () => {
		const newSocketMsgs = msgList.length;
		// offset will get incremented by the number of new socket messaages in current session/component-mount

		setPage((prev) => prev + newSocketMsgs + LIMIT);
		// console.log("socket messages", msgList.length);
	};

	const { data, error, isLoading, currentData } = useGetMessageByChatIdQuery({
		accessToken,
		chatId: id || "",
		offset: page,
		limit: LIMIT,
	});

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
		<div className="overflow-auto ">
			<button
				onClick={paginate}
				className="text-center w-full text-blue-400 font-normal"
			>
				View old messages
			</button>
			{isLoading && <p>Loading...</p>}
			{endOfMessage && <p>No more messages available</p>}
			{messages.map((msg) => {
				const { message, createdAt, sender } = msg;
				// console.log("contact in map-change", contact);
				return (
					<li key={msg._id} className="list-none">
						{/* <div>{msg.message}</div>
					<div>{msg.createdAt.toString()}</div> */}
						<ChatBubble
							msg={message}
							// sender={state.contact}
							sender={{ id: sender, name: contact }}
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
							className="border border-black list-none"
						>
							<ChatBubble
								msg={msg.message}
								time={msg.createdAt}
								sender={{ id: msg.sender, name: contact }}
							/>
						</li>
					);
				})}
		</div>
	);
};

export default Conversation;
