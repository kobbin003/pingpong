import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../../../redux/store/store";
import { useGetMessageByChatIdQuery } from "../../../../api/chats";

type Props = {};

const Conversation = ({}: Props) => {
	const { id } = useParams();
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
		//TODO
		// set error
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
