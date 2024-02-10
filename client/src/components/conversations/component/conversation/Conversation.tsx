import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../redux/store/store";
import { useGetMessageByChatIdQuery } from "../../../../api/chats";
import { setErrorMsg } from "../../../../redux/reducers/alertSlice";
import { TError } from "../../../../types/error";
import { useContext, useEffect } from "react";
import { SocketContext } from "../../../../context/SocketProvider";

type Props = {};

const Conversation = ({}: Props) => {
	const { id } = useParams();

	const dispatch = useDispatch();
	// console.log("conversation-chatId", id);

	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { msgList, joinRoom, leaveRoom, setMsgList } =
		useContext(SocketContext);

	const { data, error, isLoading } = useGetMessageByChatIdQuery({
		accessToken,
		chatId: id || "",
	});

	// console.log("conversation", data, error);

	useEffect(() => {
		if (id) {
			console.log("room joined", id);
			joinRoom(id);
			return () => {
				console.log("room left", id);
				leaveRoom(id);
				// epmty msg list
				if (setMsgList) {
					// TODO save the msgList into database before removing it.
					// No, this task should be assigned to backend server.
					// OR, checkout createPost mutation(rtk)
					setMsgList([]);
				}
			};
		}
	}, [id]);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		const myError = error as TError;
		// console.log("conversation error", error);
		// set error
		dispatch(setErrorMsg(myError.data.error.msg));
	}

	return (
		<div className="">
			{data &&
				data.map((msg) => (
					<li key={msg._id} className="border border-black list-none">
						<div>{msg.message}</div>
						<div>{msg.createdAt.toString()}</div>
					</li>
				))}
			{msgList &&
				msgList.length > 0 &&
				msgList.map((msg, index) => {
					return (
						<li
							key={msg + index.toString()}
							className="border border-black list-none"
						>
							{msg.msg}
						</li>
					);
				})}
		</div>
	);
};

export default Conversation;
