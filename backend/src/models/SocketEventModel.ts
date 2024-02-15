import mongoose from "mongoose";

const socketEventSchema = new mongoose.Schema({});
export const SocketEventModel = mongoose.model(
	"socket-event",
	socketEventSchema
);
