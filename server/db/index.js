import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
	try {
		const connectionInstance = await mongoose.connect(
			`${process.env.DB_URL}/${DB_NAME}`,
		);
		console.log(
			`MONGODB CONNECTION SUCCESSFULLY !! DB_HOST ${connectionInstance.connection.host}`,
		);
	} catch (error) {
		console.log("CONNECTION FAILED...", error.message);
		process.exit(1);
	}
};

export default connectDB;
