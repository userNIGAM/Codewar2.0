import express from "express";

import {
  getWinners,
  getWinner,
  createWinner,
  updateWinner,
  deleteWinner,
} from "../controllers/winnerController.js";

import upload from "../middleware/multer.js";

const router = express.Router();

// Public
router.get("/", getWinners);

router.get("/:id", getWinner);

// Admin CRUD
router.post("/", upload.single("image"), createWinner);

router.put("/:id", upload.single("image"), updateWinner);

router.delete("/:id", deleteWinner);

export default router;
