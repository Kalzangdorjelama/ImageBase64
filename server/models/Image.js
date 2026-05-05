import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true
    },

    mimeType: {
      type: String,
      required: true
    },

    base64: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Image = mongoose.model("Image", imageSchema);

export default Image;