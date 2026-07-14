import mongoose from "mongoose";

const awardItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    position: {
      type: String,
      required: true,
      enum: ["winner", "first_runner_up", "second_runner_up"],
    },

    icon: {
      type: String,
      default: "badge",
    },

    gradient: {
      type: String,
      required: true,
    },

    glow: {
      type: String,
      required: true,
    },

    items: [
      {
        type: String,
      },
    ],
  },
  { _id: false }
);

const awardSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      default:
        "Please note that the prizes and awards are subject to change as per the event requirements.",
    },

    isPublished: {
      type: Boolean,
      default: true,
    },

    awards: [awardItemSchema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Award", awardSchema);