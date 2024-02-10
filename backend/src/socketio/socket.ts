// import { io } from "../index";

// // not used
// io.on("connection", (socket) => {
// 	console.log(`User connected: ${socket.id}`);

// 	socket.emit("from-server", "Welcome to the server!");

// 	socket.on("client-message", (message, cb) => {
// 		console.log(`Received from client: ${message}`);
// 		cb(`got the message`);
// 		io.emit("from-server", message);
// 	});
// });
