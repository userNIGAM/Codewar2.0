import mongoose from "mongoose";

const countdownSchema = new mongoose.Schema(
  {
    // AD (Gregorian) Calendar
    adYear: { type: Number, required: true },
    adMonth: { type: Number, required: true, min: 1, max: 12 },
    adDate: { type: Number, required: true, min: 1, max: 31 },
    adHours: { type: Number, required: true, min: 0, max: 23 },
    
    // BS (Bikram Sambat) Calendar
    bsYear: { type: Number, required: true },
    bsMonth: { type: Number, required: true, min: 1, max: 12 },
    bsDate: { type: Number, required: true, min: 1, max: 32 },
    bsHours: { type: Number, required: true, min: 0, max: 23 },
    
    // Converted target date (for easy frontend use)
    targetDate: { type: Date, required: true },
    
    // Calendar system being used (AD or BS)
    activeCalendar: { type: String, enum: ["AD", "BS"], default: "AD" },
    
    // Is active
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Countdown = mongoose.model("Countdown", countdownSchema);
