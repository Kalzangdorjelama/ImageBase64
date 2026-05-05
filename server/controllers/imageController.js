import Image from "../models/Image.js";

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded"
      });
    }

    const b64 = req.file.buffer.toString("base64");

    const dataUrl =
      `data:${req.file.mimetype};base64,${b64}`;

    const newImage = await Image.create({
      fileName: req.file.originalname,
      mimeType: req.file.mimetype,
      base64: dataUrl
    });

    res.status(201).json({
      success: true,
      message: "Image uploaded",
      image: newImage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({
      createdAt: -1
    });

    res.status(200).json({
      success: true,
      count: images.length,
      images
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    await Image.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message: "Deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};