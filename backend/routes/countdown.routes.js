import express from "express";
import { setCountdown, getCountdown, toggleCountdown } from "../controllers/countdown.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Public route - get current countdown
router.get("/", getCountdown);

// Admin routes - set/update countdown (protected)
router.post("/set", protect, setCountdown);

// Toggle countdown (protected)
router.put("/toggle", protect, toggleCountdown);

export default router;
