import express from "express";

import {
  createOrUpdateEvent,
  getEvents,
  getCurrentEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

router.get("/current", getCurrentEvent);

// Public
router.get("/", getEvents);

// Admin
router.post("/", protect, isAdmin, createOrUpdateEvent);

router.delete("/:id", protect, isAdmin, deleteEvent);

export default router;
