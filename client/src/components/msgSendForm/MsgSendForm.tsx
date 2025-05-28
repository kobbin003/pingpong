import { Send } from "lucide-react";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketProvider";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const MsgSendForm = () => {
	const [msg, setMsg] = useState<string>("");

	const { id } = useParams();

	const { sendMsg: sendSocketMsg } = useContext(SocketContext);

	const handleMsgInput = (e: ChangeEvent<HTMLInputElement>) => {
		const msgInput = e.target.value;
		setMsg(msgInput);
	};

	const sendMsg = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (id) {
			sendSocketMsg({
				msg: {
					message: msg,
					// sender: uid,
					createdAt: new Date().toISOString(),
				},
				roomId: id,
			});
		}
		// clear input after sending message
		setMsg("");
	};

	// empty the send input when changing room
	useEffect(() => {
		setMsg("");
	}, [id]);

	return (
		<div className="p-4 border-t border-gray-200 dark:border-gray-800">
			<div className="flex items-center space-x-2">
				<form onSubmit={sendMsg} className="flex gap-2  flex-1">
					<Input
						type="text"
						placeholder="Type a message..."
						className="flex-1 focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none border border-black/50"
						onChange={handleMsgInput}
						value={msg}
					/>
					<Button size="icon" type="submit">
						<Send className="h-4 w-4" />
					</Button>
				</form>
			</div>
		</div>
	);
	// return (
	// 	<div className="p-2 w-full">
	// 		{/* <div className="absolute w-full bottom-0 bg-green-500"> */}
	// 		<form onSubmit={sendMsg} className=" flex gap-2 ">
	// 			<input
	// 				type="text"
	// 				value={msg}
	// 				onChange={handleMsgInput}
	// 				className="flex-1 caret-black p-2 w-4/5"
	// 				placeholder="type a message"
	// 			/>
	// 			<button
	// 				type="submit"
	// 				className="text-center bg-slate-700/90 px-3 text-white rounded-sm"
	// 			>
	// 				send
	// 			</button>
	// 		</form>
	// 	</div>
	// );
};

export default MsgSendForm;
