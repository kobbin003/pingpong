import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useCreatePostMutation } from "../../api/message";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { useParams } from "react-router-dom";

const MsgSendForm = () => {
	const [msg, setMsg] = useState<string>();

	const handleMsgInput = (e: ChangeEvent<HTMLInputElement>) => {
		const msgInput = e.target.value;
		setMsg(msgInput);
	};
	const { id } = useParams();
	const { accessToken } = useSelector((state: RootState) => state.auth);
	const [createPost, result] = useCreatePostMutation();

	const sendMsg = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log("is msg", msg);
		if (msg) {
			createPost({ accessToken, message: msg, chatId: id || "" });
		}
	};

	useEffect(() => {
		console.log("msg-change", msg);
	}, [msg]);

	useEffect(() => {
		console.log("msg-send-result", result);
	}, [result]);

	return (
		<div className="absolute w-full bottom-0 bg-green-500">
			<form onSubmit={sendMsg}>
				<input type="text" value={msg} onChange={handleMsgInput} />
				<button type="submit">send</button>
			</form>
		</div>
	);
};

export default MsgSendForm;
