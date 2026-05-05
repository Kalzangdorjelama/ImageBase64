import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/image", imageRoutes);

connectDB()
	.then(() => {
		app.listen(process.env.PORT || 8000, () => {
			console.log(`Server running on port ${process.env.PORT}`);
		});
	})
	.catch((error) => {
		console.log("CONNECTION FAILED ... ", error.message);
	});
