// import express from "express";

// import {
//   addAdvisor,
//   getAdvisors,
//   getAdvisor,
//   deleteAdvisor,
// } from "../controllers/advisor.Controller.js";

// import upload from "../middleware/multer.js";

// // If you already have admin authentication:
// import { protect} from "../middleware/auth.js";

// const router = express.Router();

// // ========================================
// // PUBLIC
// // ========================================

// // Get all advisors
// router.get("/", getAdvisors);

// // Get single advisor
// router.get("/:id", getAdvisor);


// // ========================================
// // ADMIN
// // ========================================

// // Add advisor
// router.post(
//   "/",
//   protect,
//   (req, res, next) => {
//     console.log("✅ POST /api/advisors reached");
//     console.log("User:", req.user);
//     next();
//   },
//   upload.single("image"),
//   addAdvisor
// );

// // Delete advisor
// router.delete(
//   "/:id",
//   protect,
//   deleteAdvisor
// );

// export default router;

router.post(
  "/",
  (req, res, next) => {
    console.log("🔥 ADVISOR POST ROUTE REACHED");
    next();
  },
  protect,
  (req, res, next) => {
    console.log("🔥 PROTECT PASSED");
    console.log("User:", req.user);
    next();
  },
  upload.single("image"),
  (req, res, next) => {
    console.log("🔥 MULTER PASSED");
    console.log("File:", req.file);
    console.log("Body:", req.body);
    next();
  },
  addAdvisor
);