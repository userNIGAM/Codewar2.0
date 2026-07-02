import express from "express";
import upload from "../middleware/multer.js";

import {
    createSponser,
    getSponsors,
    updateSponsor,
    deleteSponsor,
} from "../controllers/sponsor.controller.js";

const router = express.Router();

router.post("/", upload.single("image"), createSponser);

router.get("/", getSponsors);

router.put("/:id", upload.single("image"), updateSponsor);

router.delete("/:id", deleteSponsor);

export default router;