import { ReactNode, createContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";

type Props = { children: ReactNode };
const serverURL = `http://localhost:3000`;
const SocketContext = createContext({ trial: "" });
const SocketProvider = ({ children }: Props) => {
	//* socket
	useEffect(() => {
		console.log("socket provider");
		const socket: Socket = io(serverURL);
		const onSocketConnect = () => {
			console.log(`User connected: ${socket.id}`);
		};
		const onSocketDisconnect = () => {
			console.log(`User disconnected: ${socket.id}`);
		};
		const onConnError = (err: any) => {
			console.log("socket connection error", err);
		};
		socket.on("connect", onSocketConnect);
		socket.on("disconnect", onSocketDisconnect);

		return () => {
			socket.off("connect", onSocketConnect);
			socket.off("disconnect", onSocketDisconnect);
			socket.off("connect_error", onConnError);
		};
	}, []);
	return (
		<SocketContext.Provider value={{ trial: "sometring" }}>
			{children}
		</SocketContext.Provider>
	);
};

export default SocketProvider;
