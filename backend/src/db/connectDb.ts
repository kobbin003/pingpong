import "dotenv/config";
import mongoose from "mongoose";
const dbPassword = process.env.MONGODBPASSWORDFETO;

const uri = `mongodb+srv://dkfeto:${dbPassword}@cluster0.cedywd8.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://kobin:${dbPassword}@cluster0.zdgbeqw.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDb() {
	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`${error.message}`);
		process.exit(1);
	}
}
