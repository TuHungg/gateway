import mongoose from "mongoose";

// export class ConectionMongoDb {
// 	private static connection: mongoose.Connection;

// 	public async connect(): Promise<void> {
// 		console.log("mongodb://localhost:27017/neox");

// 		const uri = "mongodb://localhost:27017/neox";
// 		await mongoose.connect(uri);
// 	}
// }

export class ConnectionMongoDb {
	private static connection: ConnectionMongoDb;

	private constructor() {}

	public static async connect(): Promise<ConnectionMongoDb> {
		if (!ConnectionMongoDb.connection) {
			ConnectionMongoDb.connection = new ConnectionMongoDb();

			return await mongoose.connect("mongodb://localhost:27017/neox");
		}

		return ConnectionMongoDb.connect;
	}
}
