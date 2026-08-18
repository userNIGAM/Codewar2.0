import Advisor from "../models/Advisor.model.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ================================
// ADD ADVISOR - ADMIN
// ================================
export const addAdvisor = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        success: false,
        message: "Name and role are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Advisor image is required",
      });
    }

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "codewar/advisors",
    });

    // Delete local file after Cloudinary upload
    fs.unlinkSync(req.file.path);

    // Save advisor to MongoDB
    const advisor = await Advisor.create({
      name,
      role,
      image: result.secure_url,
      cloudinaryId: result.public_id,
    });

    return res.status(201).json({
      success: true,
      message: "Advisor added successfully",
      advisor,
    });
  } catch (error) {
    console.error("Add Advisor Error:", error);

    // Remove local file if something fails
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message: "Failed to add advisor",
      error: error.message,
    });
  }
};

// ================================
// GET ALL ADVISORS - PUBLIC
// ================================
export const getAdvisors = async (req, res) => {
  try {
    const advisors = await Advisor.find()
      .sort({ createdAt: -1 })
      .select("-cloudinaryId");

    return res.status(200).json({
      success: true,
      advisors,
    });
  } catch (error) {
    console.error("Get Advisors Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch advisors",
      error: error.message,
    });
  }
};

// ================================
// GET SINGLE ADVISOR
// ================================
export const getAdvisor = async (req, res) => {
  try {
    const advisor = await Advisor.findById(req.params.id).select(
      "-cloudinaryId",
    );

    if (!advisor) {
      return res.status(404).json({
        success: false,
        message: "Advisor not found",
      });
    }

    return res.status(200).json({
      success: true,
      advisor,
    });
  } catch (error) {
    console.error("Get Advisor Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch advisor",
      error: error.message,
    });
  }
};

// ================================
// DELETE ADVISOR - ADMIN
// ================================
export const deleteAdvisor = async (req, res) => {
  try {
    const advisor = await Advisor.findById(req.params.id);

    if (!advisor) {
      return res.status(404).json({
        success: false,
        message: "Advisor not found",
      });
    }

    // Delete image from Cloudinary
    if (advisor.cloudinaryId) {
      await cloudinary.uploader.destroy(advisor.cloudinaryId);
    }

    // Delete advisor from MongoDB
    await Advisor.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Advisor deleted successfully",
    });
  } catch (error) {
    console.error("Delete Advisor Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete advisor",
      error: error.message,
    });
  }
};
