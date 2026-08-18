import mongoose from "mongoose";

const advisorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    cloudinaryId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Advisor = mongoose.model("Advisor", advisorSchema);

export default Advisor;