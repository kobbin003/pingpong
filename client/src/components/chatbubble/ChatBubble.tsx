import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { dateFormatter } from "../../utils/dateFormatter";

type Props = {
	msg: string;
	sender: { id: string; name: string };
	time: string;
};

const ChatBubble = ({ msg, sender, time }: Props) => {
	const { hr, min } = dateFormatter(new Date(time));
	// console.log("formatted date", hr, min, sec);
	const { uid } = useSelector((state: RootState) => state.user);
	const chatType = uid == sender.id ? "chat-end" : "chat-start";
	const bubbleType = uid == sender.id ? "bg-blue-400" : "bg-gray-800/90";
	const senderName = uid == sender.id ? "You" : sender.name;
	// console.log("sender vs uid", sender.id, uid);
	return (
		// <div className={`chat chat-start`}>
		<div className={`chat ${chatType}`}>
			<p className="chat-header pb-1">{senderName}</p>
			<p className={`chat-bubble ${bubbleType} text-white`}>
				{msg}&nbsp;
				<time className="text-xs">{`${hr}:${min}`}</time>
			</p>
		</div>
	);
};

export default ChatBubble;
