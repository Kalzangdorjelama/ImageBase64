import express from "express";
import multer from "multer";
import { uploadImage, getAllImages, deleteImage } from "../controllers/imageController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/upload", upload.single("image"), uploadImage);

router.get("/all", getAllImages);

router.delete("/:id", deleteImage);

export default router;
