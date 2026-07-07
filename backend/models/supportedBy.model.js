import mongoose from "mongoose";

const supportedBySchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const SupportedBy = mongoose.model("SupportedBy", supportedBySchema);
