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

// GET all winners
router.get("/", getWinners);

// GET single winner
router.get("/:id", getWinner);

// CREATE winner
router.post("/", upload.single("image"), createWinner);

// UPDATE winner
router.put("/:id", upload.single("image"), updateWinner);

// DELETE winner
router.delete("/:id", deleteWinner);

export default router;
