import { Countdown } from "../models/countdown.model.js";
import { bsToAd } from "../utils/bsToAd.js";

// Create or update countdown
export const setCountdown = async (req, res, next) => {
  try {
    const { activeCalendar, adYear, adMonth, adDate, adHours, bsYear, bsMonth, bsDate, bsHours } = req.body;

    // Validate input
    if (!activeCalendar || !["AD", "BS"].includes(activeCalendar)) {
      return res.status(400).json({ success: false, message: "Invalid calendar system" });
    }

    let targetDate;

    // Calculate target date based on active calendar
    if (activeCalendar === "AD") {
      if (!adYear || !adMonth || !adDate || adHours === undefined) {
        return res.status(400).json({ success: false, message: "AD date fields are required" });
      }
      targetDate = new Date(adYear, adMonth - 1, adDate, adHours, 0, 0);
    } else {
      if (!bsYear || !bsMonth || !bsDate || bsHours === undefined) {
        return res.status(400).json({ success: false, message: "BS date fields are required" });
      }
      // Convert BS to AD for storing targetDate
      targetDate = bsToAd(bsYear, bsMonth, bsDate);
      targetDate.setHours(bsHours, 0, 0);
    }

    // Find existing countdown or create new one
    let countdown = await Countdown.findOne({});

    if (!countdown) {
      countdown = new Countdown({
        activeCalendar,
        adYear: adYear || bsYear - 56,
        adMonth: adMonth || 1,
        adDate: adDate || 1,
        adHours: adHours || 0,
        bsYear,
        bsMonth,
        bsDate,
        bsHours,
        targetDate,
        isActive: true,
      });
    } else {
      countdown.activeCalendar = activeCalendar;
      countdown.adYear = adYear;
      countdown.adMonth = adMonth;
      countdown.adDate = adDate;
      countdown.adHours = adHours;
      countdown.bsYear = bsYear;
      countdown.bsMonth = bsMonth;
      countdown.bsDate = bsDate;
      countdown.bsHours = bsHours;
      countdown.targetDate = targetDate;
    }

    await countdown.save();

    res.status(200).json({ success: true, data: countdown, message: "Countdown updated successfully" });
  } catch (error) {
    next(error);
  }
};

// Get current countdown
export const getCountdown = async (req, res, next) => {
  try {
    const countdown = await Countdown.findOne({ isActive: true });

    if (!countdown) {
      return res.status(404).json({ success: false, message: "No active countdown found" });
    }

    res.status(200).json({ success: true, data: countdown });
  } catch (error) {
    next(error);
  }
};

// Toggle countdown active status
export const toggleCountdown = async (req, res, next) => {
  try {
    const countdown = await Countdown.findOne({});

    if (!countdown) {
      return res.status(404).json({ success: false, message: "Countdown not found" });
    }

    countdown.isActive = !countdown.isActive;
    await countdown.save();

    res.status(200).json({ success: true, data: countdown, message: "Countdown toggled successfully" });
  } catch (error) {
    next(error);
  }
};
