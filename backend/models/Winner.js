import mongoose from "mongoose";

const winnerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    badge: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: Number,
      required: true,
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

export default mongoose.model("Winner", winnerSchema);