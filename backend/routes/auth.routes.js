import express from "express";
import { getCurrentAdmin, login, logout } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getCurrentAdmin);
router.post("/logout", protect, logout);

export default router;
