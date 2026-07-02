import express from "express";
import upload from "../middleware/multer.js";
import { validateSponsor } from "../middleware/validate.js";
import {
  createSponsor,
  getSponsors,
  getSponsorById,
  updateSponsor,
  deleteSponsor,
} from "../controllers/sponsor.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), validateSponsor, createSponsor);
router.get("/", getSponsors);
router.get("/:id", getSponsorById);
router.put("/:id", upload.single("image"), validateSponsor, updateSponsor);
router.delete("/:id", deleteSponsor);

export default router;