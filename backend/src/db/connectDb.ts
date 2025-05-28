import { createAdapter } from "@socket.io/mongo-adapter";
import "dotenv/config";
import mongoose from "mongoose";
import { Server } from "socket.io";
const dbPassword = process.env.MONGODBPASSWORD;

const uri = `mongodb+srv://kobin369:${dbPassword}@cluster0.xeiow6y.mongodb.net/?retryWrites=true&w=majority`;

export async function connectDb(io: Server) {
	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB connected: ${conn.connection.host}`);
		/* --------------------------------------------------------------- */
		// this COLLECTION is necessary to implement the mongo adapter for socket
		const COLLECTION = "my-socket.io-adapter-events";
		const db = conn.connection.db;

		// lists all the collection in the db
		const colls = db.listCollections().toArray();

		// checks if the "COLLECTION" is already present
		const hasCOLLECTION = (await colls).some((coll) => coll.name == COLLECTION);

		// We will create the colection only if it is not found
		// else we do not have to create one.
		if (!hasCOLLECTION) {
			db.createCollection(COLLECTION, { capped: true, size: 1e6 })
				.then(() => {
					const mongoCollection = db.collection(COLLECTION);
					//@ts-ignore
					io.adapter(createAdapter(mongoCollection));
				})
				.catch((err) => {
					console.log(`error creating capped collection`, err);
				});
		}

		const mongoCollection = db.collection(COLLECTION);
		//@ts-ignore
		io.adapter(createAdapter(mongoCollection));
		/* --------------------------------------------------------------- */
	} catch (error) {
		console.error(`${error.message}`);
		process.exit(1);
	}
}
