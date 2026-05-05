import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes.js";
import connectDB from "./db/index.js";

dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",                   
  process.env.CLIENT_URL,                     
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.use("/api/image", imageRoutes);

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((error) => {
    console.log("CONNECTION FAILED ... ", error.message);
  });