import Winner from "../models/Winner.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs/promises";

// ------------------------------------
// Helper: Upload image to Cloudinary
// ------------------------------------
const uploadToCloudinary = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "codewar/winners",
    resource_type: "image",
  });
};

// ------------------------------------
// Helper: Delete local file
// ------------------------------------
const deleteLocalFile = async (filePath) => {
  if (!filePath) return;

  try {
    await fs.unlink(filePath);
  } catch (error) {
    console.log("Local file already removed:", error.message);
  }
};

// ------------------------------------
// Helper: Delete Cloudinary image
// ------------------------------------
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
  }
};

// ====================================
// GET ALL WINNERS
// GET /api/winners
// ====================================
export const getWinners = async (req, res) => {
  try {
    const winners = await Winner.find().sort({ position: 1 });

    res.status(200).json({
      success: true,
      winners,
    });
  } catch (error) {
    console.error("Get winners error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch winners",
    });
  }
};

// ====================================
// GET SINGLE WINNER
// GET /api/winners/:id
// ====================================
export const getWinner = async (req, res) => {
  try {
    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found",
      });
    }

    res.status(200).json({
      success: true,
      winner,
    });
  } catch (error) {
    console.error("Get winner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch winner",
    });
  }
};

// ====================================
// CREATE WINNER
// POST /api/winners
// ====================================
export const createWinner = async (req, res) => {
  let localFile = null;
  let cloudinaryImage = null;

  try {
    const { title, position } = req.body;

    if (!title || !position) {
      return res.status(400).json({
        success: false,
        message: "Title and position are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Winner image is required",
      });
    }

    const positionNumber = Number(position);

    if (![1, 2, 3].includes(positionNumber)) {
      return res.status(400).json({
        success: false,
        message: "Position must be 1, 2 or 3",
      });
    }

    // Check if position already exists
    const existingWinner = await Winner.findOne({
      position: positionNumber,
    });

    if (existingWinner) {
      return res.status(409).json({
        success: false,
        message: "A winner already exists for this position",
      });
    }

    // Local file created by Multer
    localFile = req.file.path;

    // Upload to Cloudinary
    cloudinaryImage = await uploadToCloudinary(localFile);

    // Save to MongoDB
    const winner = await Winner.create({
      title: title.trim(),

      position: positionNumber,

      image: {
        url: cloudinaryImage.secure_url,
        public_id: cloudinaryImage.public_id,
      },
    });

    // Remove temporary local image
    await deleteLocalFile(localFile);

    res.status(201).json({
      success: true,
      message: "Winner created successfully",
      winner,
    });
  } catch (error) {
    console.error("Create winner error:", error);

    // Delete local file if something failed
    if (localFile) {
      await deleteLocalFile(localFile);
    }

    // Delete Cloudinary image if MongoDB save failed
    if (cloudinaryImage?.public_id) {
      await deleteFromCloudinary(cloudinaryImage.public_id);
    }

    // Duplicate position
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "This winner position already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create winner",
      error: error.message,
    });
  }
};

// ====================================
// UPDATE WINNER
// PUT /api/winners/:id
// ====================================
export const updateWinner = async (req, res) => {
  let localFile = null;
  let newCloudinaryImage = null;

  try {
    const { title, position } = req.body;

    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found",
      });
    }

    if (position) {
      const positionNumber = Number(position);

      if (![1, 2, 3].includes(positionNumber)) {
        return res.status(400).json({
          success: false,
          message: "Position must be 1, 2 or 3",
        });
      }

      // Make sure another winner isn't using it
      const existingWinner = await Winner.findOne({
        position: positionNumber,
        _id: { $ne: winner._id },
      });

      if (existingWinner) {
        return res.status(409).json({
          success: false,
          message: "Another winner already uses this position",
        });
      }

      winner.position = positionNumber;
    }

    if (title) {
      winner.title = title.trim();
    }

    // -----------------------------
    // Replace image if provided
    // -----------------------------
    if (req.file) {
      localFile = req.file.path;

      // Upload NEW image first
      newCloudinaryImage = await uploadToCloudinary(localFile);

      const oldPublicId = winner.image?.public_id;

      // Replace MongoDB image
      winner.image = {
        url: newCloudinaryImage.secure_url,
        public_id: newCloudinaryImage.public_id,
      };

      await winner.save();

      // Now delete OLD Cloudinary image
      if (oldPublicId) {
        await deleteFromCloudinary(oldPublicId);
      }
    } else {
      await winner.save();
    }

    // Delete temporary file
    if (localFile) {
      await deleteLocalFile(localFile);
    }

    res.status(200).json({
      success: true,
      message: "Winner updated successfully",
      winner,
    });
  } catch (error) {
    console.error("Update winner error:", error);

    if (localFile) {
      await deleteLocalFile(localFile);
    }

    // If new Cloudinary upload happened but update failed
    if (newCloudinaryImage?.public_id) {
      await deleteFromCloudinary(newCloudinaryImage.public_id);
    }

    res.status(500).json({
      success: false,
      message: "Failed to update winner",
      error: error.message,
    });
  }
};

// ====================================
// DELETE WINNER
// DELETE /api/winners/:id
// ====================================
export const deleteWinner = async (req, res) => {
  try {
    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found",
      });
    }

    // Delete Cloudinary image
    if (winner.image?.public_id) {
      await deleteFromCloudinary(winner.image.public_id);
    }

    // Delete MongoDB document
    await Winner.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Winner deleted successfully",
    });
  } catch (error) {
    console.error("Delete winner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete winner",
      error: error.message,
    });
  }
};
