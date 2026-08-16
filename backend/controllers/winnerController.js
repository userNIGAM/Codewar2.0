import Winner from "../models/Winner.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// Upload buffer to Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "codewar/winners",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// DELETE image from Cloudinary
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId);
};

// GET all winners
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

// GET single winner
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

// CREATE winner
export const createWinner = async (req, res) => {
  try {
    const { title, badge, position } = req.body;

    if (!title || !badge || !position) {
      return res.status(400).json({
        success: false,
        message: "Title, badge and position are required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Winner image is required",
      });
    }

    // Upload image
    const uploadedImage = await uploadToCloudinary(req.file.buffer);

    // Save winner
    const winner = await Winner.create({
      title,
      badge,
      position,

      image: {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      },
    });

    res.status(201).json({
      success: true,
      message: "Winner created successfully",
      winner,
    });
  } catch (error) {
    console.error("Create winner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create winner",
    });
  }
};

// UPDATE winner
export const updateWinner = async (req, res) => {
  try {
    const { title, badge, position } = req.body;

    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found",
      });
    }

    // Update text fields
    if (title) winner.title = title;
    if (badge) winner.badge = badge;
    if (position) winner.position = position;

    // If a new image was uploaded
    if (req.file) {
      // Delete old Cloudinary image
      if (winner.image?.public_id) {
        await deleteFromCloudinary(winner.image.public_id);
      }

      // Upload new image
      const uploadedImage = await uploadToCloudinary(req.file.buffer);

      winner.image = {
        url: uploadedImage.secure_url,
        public_id: uploadedImage.public_id,
      };
    }

    await winner.save();

    res.status(200).json({
      success: true,
      message: "Winner updated successfully",
      winner,
    });
  } catch (error) {
    console.error("Update winner error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update winner",
    });
  }
};

// DELETE winner
export const deleteWinner = async (req, res) => {
  try {
    const winner = await Winner.findById(req.params.id);

    if (!winner) {
      return res.status(404).json({
        success: false,
        message: "Winner not found",
      });
    }

    // Delete image from Cloudinary
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
    });
  }
};
