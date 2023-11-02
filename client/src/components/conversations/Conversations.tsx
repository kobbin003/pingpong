import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShowChatListContext } from "../../pages/Layout1/Layout1";

type Props = {};

const Conversations = ({}: Props) => {
	const { id } = useParams();
	console.log("Conversations-params", id);
	const { setShowChatList } = useContext(ShowChatListContext);
	return (
		<div className="bg-yellow-300 flex-1">
			<div className="bg-blue-500 flex justify-end">
				<button
					className="btn sm:hidden"
					onClick={() => {
						setShowChatList(true);
					}}
				>
					chats
				</button>
			</div>
			<div>Conversations-{id}</div>
		</div>
	);
};

export default Conversations;
