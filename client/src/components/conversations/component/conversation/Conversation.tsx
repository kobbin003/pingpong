import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../redux/store/store";
import { useGetMessageByChatIdQuery } from "../../../../api/chats";
import { setErrorMsg } from "../../../../redux/reducers/alertSlice";
import { TError } from "../../../../types/error";

type Props = {};

const Conversation = ({}: Props) => {
	const { id } = useParams();
	const dispatch = useDispatch();
	console.log("conversation-chatId", id);
	const { accessToken } = useSelector((state: RootState) => state.auth);

	const { data, error, isLoading } = useGetMessageByChatIdQuery({
		accessToken,
		chatId: id || "",
	});
	console.log("conversation", data);
	if (isLoading) {
		return <p>Loading...</p>;
	}
	if (error) {
		const myError = error as TError;
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
		</div>
	);
};

export default Conversation;
