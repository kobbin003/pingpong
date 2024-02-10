import { Socket, io } from "socket.io-client";

const serverURL = `http://localhost:3000`;

console.log("socket init client");

const socket: Socket = io(serverURL);

socket.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`);
});
