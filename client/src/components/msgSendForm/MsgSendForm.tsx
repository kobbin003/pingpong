import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { SocketContext } from "../../context/SocketProvider";

const MsgSendForm = () => {
	const [msg, setMsg] = useState<string>("");

	const { sendMsg: sendSocketMsg } = useContext(SocketContext);

	const handleMsgInput = (e: ChangeEvent<HTMLInputElement>) => {
		const msgInput = e.target.value;
		setMsg(msgInput);
	};
	const { id } = useParams();

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
	};

	return (
		<div className="p-2 w-full">
			{/* <div className="absolute w-full bottom-0 bg-green-500"> */}
			<form onSubmit={sendMsg} className=" flex gap-2 ">
				<input
					type="text"
					value={msg}
					onChange={handleMsgInput}
					className="flex-1 caret-black p-2 w-4/5"
					placeholder="type a message"
				/>
				<button
					type="submit"
					className="text-center bg-slate-700/90 px-3 text-white rounded-sm"
				>
					send
				</button>
			</form>
		</div>
	);
};

export default MsgSendForm;
