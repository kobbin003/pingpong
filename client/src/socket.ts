import { Socket, io } from "socket.io-client";

const serverURL = `http://localhost:3000`;

console.log("working");

const socket: Socket = io(serverURL);

socket.on("connection", (socket) => {
	console.log(`User connected: ${socket.id}`);

	// socket.emit("from-server", "Welcome to the server!");

	// socket.on("client-message", (message, cb) => {
	// 	console.log(`Received from client: ${message}`);
	// 	cb(`got the message`);
	// 	io.emit("from-server", message);
	// });
});
