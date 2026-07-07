import express from "express";
import upload from "../middleware/multer.js";
import { validateSupportedBy } from "../middleware/validate.js";
import {
  createSupportedBy,
  getSupportedBy,
  getSupportedByById,
  updateSupportedBy,
  deleteSupportedBy,
} from "../controllers/supportedBy.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), validateSupportedBy, createSupportedBy);
router.get("/", getSupportedBy);
router.get("/:id", getSupportedByById);
router.put("/:id", upload.single("image"), validateSupportedBy, updateSupportedBy);
router.delete("/:id", deleteSupportedBy);

export default router;
