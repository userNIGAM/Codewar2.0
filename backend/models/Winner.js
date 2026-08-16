import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: Number,
      required: true,
      unique: true,
      min: 1,
      max: 3,
    },

    image: {
      url: {
        type: String,
        required: true,
      },

      public_id: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Winner = mongoose.model("Winner", winnerSchema);

export default Winner;