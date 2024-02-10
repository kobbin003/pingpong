import { ReactNode, createContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

type Props = { children: ReactNode };
const serverURL = `http://localhost:3000`;

export type SocketMsg = {
	msg: string;
	status?: number;
};
export const SocketContext = createContext<{
	socket: Socket | null;
	joinRoom: (roomId: string) => void | null;
	leaveRoom: (roomId: string) => void | null;
	sendMsg: (arg: { msg: string; roomId: string }) => void | null;
	setMsgList: React.Dispatch<React.SetStateAction<SocketMsg[]>> | null;
	msgList: SocketMsg[];
}>({
	socket: null,
	// joinRoom: null,
	joinRoom: () => {},
	leaveRoom: () => {},
	sendMsg: () => {},
	setMsgList: () => {},
	msgList: [],
});

const SocketProvider = ({ children }: Props) => {
	const [socket, setSocket] = useState<Socket>();
	const [msgList, setMsgList] = useState<SocketMsg[]>([]);
	// roomId =  chatId
	const joinRoom = (roomId: string) => {
		socket?.emit("join-room", roomId, (ack: any) => {
			console.log("join-room server-ack: ", ack);
		});
	};

	const leaveRoom = (roomId: string) => {
		socket?.emit("leave-room", roomId, (ack: any) => {
			console.log("leave-room server-ack: ", ack);
		});
	};

	const sendPrivateMsg = ({ msg, roomId }: { msg: string; roomId: string }) => {
		socket?.emit(
			"private-msg",
			{ msg, roomId },
			(ack: { status: number; msg: string }) => {
				console.log("private-msg server-ack: ", ack);
			}
		);
	};

	useEffect(() => {
		console.log("socket provider");
		const _socket: Socket = io(serverURL);

		setSocket(_socket);
		const onSocketConnect = () => {
			console.log(`User connected: ${_socket.id}`);
		};
		const onSocketDisconnect = () => {
			console.log(`User disconnected: ${_socket.id}`);
		};
		const onConnError = (err: any) => {
			console.log("socket connection error", err);
		};
		const onAnyHandler = (event: any, ...args: any) => {
			console.log("event: ", event, "args: ", args);
		};

		// listening broadcasted private message.
		_socket.on("private-msg-receive", (msg: SocketMsg) => {
			console.log("private-msg-received", msg);
			// update msgList on receiving broadcasted private message.
			if (msg) {
				setMsgList((prev) => [...prev, msg]);
			}
		});

		_socket.on("connect", onSocketConnect);
		_socket.on("disconnect", onSocketDisconnect);
		_socket.on("onAny", onAnyHandler);

		return () => {
			_socket.off("connect", onSocketConnect);
			_socket.off("disconnect", onSocketDisconnect);
			_socket.off("onAny", onAnyHandler);
			_socket.off("connect_error", onConnError);
		};
	}, []);

	return (
		<SocketContext.Provider
			value={{
				socket: socket || null,
				joinRoom,
				leaveRoom,
				sendMsg: sendPrivateMsg,
				msgList,
				setMsgList,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
