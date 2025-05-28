import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useEffect, useRef } from "react";

type Props = {
	msg: string;
	sender: { id: string; name: string };
	time: string;
	isLastBubble?: boolean;
};

const ChatBubble = ({ msg, sender, time, isLastBubble }: Props) => {
	// const { hr, min } = dateFormatter(new Date(time));
	// console.log("formatted date", hr, min, sec);
	const { uid } = useSelector((state: RootState) => state.user);
	// const chatType = uid == sender.id ? "chat-end" : "chat-start";
	// const bubbleType = uid == sender.id ? "bg-blue-400" : "bg-gray-800/90";
	// const senderName = uid == sender.id ? "You" : sender.name;
	const userIsSender = uid == sender.id;
	// console.log("sender vs uid", sender.id, uid);
	const formattedTime = new Date(time).toLocaleTimeString("en-US", {
		hour12: true,
		hour: "numeric",
		minute: "numeric",
	});
	const bubbleRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (isLastBubble) {
			// console.log("islast-bubble: ", msg);
			const el = bubbleRef.current;
			el?.scrollIntoView();
		}
	}, [isLastBubble]);
	return (
		<div
			ref={bubbleRef}
			className={`flex ${userIsSender ? "justify-end" : "justify-start"}`}
		>
			<div
				className={`max-w-[70%] px-4 py-2 rounded-lg ${
					userIsSender
						? "bg-blue-500 text-white rounded-br-none"
						: "bg-gray-200 dark:bg-gray-800 rounded-bl-none"
				}`}
			>
				<p>{msg}</p>
				<p
					className={`text-xs mt-1 ${
						userIsSender ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
					}`}
				>
					{formattedTime}
				</p>
			</div>
		</div>
	);
	// return (
	// 	<div className={`chat ${chatType}`}>
	// 		<p className="chat-header pb-1">{senderName}</p>
	// 		<p className={`chat-bubble ${bubbleType} text-white`}>
	// 			{msg}&nbsp;
	// 			<time className="text-xs">{`${hr}:${min}`}</time>
	// 		</p>
	// 	</div>
	// );
};

export default ChatBubble;
