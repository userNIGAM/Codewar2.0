import express from "express";

import {
  getAward,
  updateAward,
} from "../controllers/award.controller.js";

import { protect } from "../middleware/auth.js";
import { isAdmin } from "../middleware/isAdmin.js";

const router = express.Router();

// Public
router.get("/", getAward);

// Admin
router.put("/", protect, isAdmin, updateAward);

export default router;