import express from "express";

import {
  addAdvisor,
  getAdvisors,
  getAdvisor,
  deleteAdvisor,
} from "../controllers/advisor.Controller.js";

import upload from "../middleware/multer.js";

// If you already have admin authentication:
import { protect} from "../middleware/auth.js";

const router = express.Router();

// ========================================
// PUBLIC
// ========================================

// Get all advisors
router.get("/", getAdvisors);

// Get single advisor
router.get("/:id", getAdvisor);


// ========================================
// ADMIN
// ========================================

// Add advisor
router.post(
  "/",
  protect,
  upload.single("image"),
  addAdvisor
);

// Delete advisor
router.delete(
  "/:id",
  protect,
  deleteAdvisor
);

export default router;