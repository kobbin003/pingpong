import "dotenv/config";
import mongoose from "mongoose";
const dbPassword = process.env.MONGODBPASSWORD;

const uri = `mongodb+srv://kobin369:${dbPassword}@cluster0.xeiow6y.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDb() {
	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`${error.message}`);
		process.exit(1);
	}
}
