import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    year: {
      type: Number,
      required: true,
      unique: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    calendarType: {
      type: String,
      enum: ["AD", "BS"],
      required: true,
      default: "BS",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Event", eventSchema);