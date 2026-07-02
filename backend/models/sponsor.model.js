import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    imagePublicId: { type: String, required: true },
    title: { type: String, required: true, trim: true },
    salutation: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Sponsor = mongoose.model("Sponsor", sponsorSchema);