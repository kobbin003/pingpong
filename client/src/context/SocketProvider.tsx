import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";
import { VITE_BASE_URL } from "../utils/env";

type Props = { children: ReactNode; accessToken: string };

const serverURL = VITE_BASE_URL;

export type SocketMsg = {
	message: string;
	createdAt: string;
	// sender: string; //sender uid
};

export type MsgListItem = SocketMsg & { sender: string; roomId: string };

export const SocketContext = createContext<{
	// socket: Socket | null;
	joinRoom: (roomId: string) => void | null;
	leaveRoom: (roomId: string) => void | null;
	sendMsg: (arg: { msg: SocketMsg; roomId: string }) => void | null;
	setMsgList: React.Dispatch<React.SetStateAction<MsgListItem[]>> | null;
	msgList: MsgListItem[];
	disconnectClient: () => void | null;
}>({
	// socket: null,
	joinRoom: () => {},
	leaveRoom: () => {},
	sendMsg: () => {},
	setMsgList: () => {},
	msgList: [],
	disconnectClient: () => {},
});

const SocketProvider = ({ children, accessToken }: Props) => {
	console.log("socket-provider");
	const [socket, setSocket] = useState<Socket>();
	const [msgList, setMsgList] = useState<MsgListItem[]>([]);
	// roomId =  chatId

	const joinRoom = (roomId: string) => {
		console.log("joined room");
		socket?.emit("join-room", roomId, (ack: "msg read" | "msg not read") => {
			console.log("join-room server-ack: ", ack);
		});
	};

	const leaveRoom = (roomId: string) => {
		socket?.emit("leave-room", roomId, (ack: "room left") => {
			console.log("leave-room server-ack: ", ack);
		});
	};

	const sendPrivateMsg = ({
		msg,
		roomId,
	}: {
		msg: SocketMsg;
		roomId: string;
	}) => {
		socket?.emit(
			"private-msg",
			{ msg, roomId },
			(ack: { status: number; msg: SocketMsg }) => {
				console.log("private-msg server-ack: ", ack);
			}
		);
	};

	const disconnectClient = () => {
		socket?.disconnect();
	};

	useEffect(() => {
		console.log("socket provider");

		const _socket: Socket = io(serverURL, {
			autoConnect: true,
			auth: { accessToken },
		});

		setSocket(_socket);
		const onSocketConnect = () => {
			console.log(`User connected: ${_socket.id}`);
		};
		const onSocketDisconnect = () => {
			console.log(`User disconnected: ${_socket.id}`);
		};
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const onConnError = (err: any) => {
			console.log("socket connection error", err);
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// const onAnyHandler = (event: any, ...args: any) => {
		// 	console.log("event: ", event, "args: ", args);
		// };

		// listening broadcasted private message.
		_socket.on("private-msg-receive", (msg: MsgListItem) => {
			console.log("private-msg-received", msg);
			// update msgList on receiving broadcasted private message.
			if (msg) {
				setMsgList((prev) => [...prev, msg]);
			}
		});

		_socket.on("connect", onSocketConnect);
		_socket.on("disconnect", onSocketDisconnect);
		// _socket.on("onAny", onAnyHandler);

		return () => {
			_socket.off("connect", onSocketConnect);
			_socket.off("disconnect", onSocketDisconnect);
			// _socket.off("onAny", onAnyHandler);
			_socket.off("connect_error", onConnError);
		};
	}, []);

	return (
		<SocketContext.Provider
			value={{
				// socket: socket || null,
				joinRoom,
				leaveRoom,
				sendMsg: sendPrivateMsg,
				msgList,
				setMsgList,
				disconnectClient,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// function safeLog(data: any) {
// 	try {
// 		return JSON.parse(JSON.stringify(data));
// 	} catch {
// 		return "[Circular]";
// 	}
// }
export default SocketProvider;
