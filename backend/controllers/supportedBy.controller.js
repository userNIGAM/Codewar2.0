import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { SupportedBy } from "../models/supportedBy.model.js";

export const createSupportedBy = async (req, res, next) => {
  try {
    const { name, role } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    if (!process.env.CLOUD_NAME || !process.env.CLOUD_API_KEY || !process.env.CLOUD_API_SECRET) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary is not configured on the server",
      });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SupportedBy",
    });
    fs.unlinkSync(req.file.path);

    const item = await SupportedBy.create({
      name,
      role,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.status(201).json({ success: true, data: item });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const getSupportedBy = async (req, res, next) => {
  try {
    const items = await SupportedBy.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
};

export const getSupportedByById = async (req, res, next) => {
  try {
    const item = await SupportedBy.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Supported By item not found" });
    }
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateSupportedBy = async (req, res, next) => {
  try {
    const item = await SupportedBy.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Supported By item not found" });
    }

    if (req.body.name) item.name = req.body.name;
    if (req.body.role) item.role = req.body.role;

    if (req.file) {
      await cloudinary.uploader.destroy(item.imagePublicId);
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "SupportedBy" });
      fs.unlinkSync(req.file.path);
      item.image = result.secure_url;
      item.imagePublicId = result.public_id;
    }

    await item.save();
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const deleteSupportedBy = async (req, res, next) => {
  try {
    const item = await SupportedBy.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: "Supported By item not found" });
    }

    await cloudinary.uploader.destroy(item.imagePublicId);
    await item.deleteOne();
    res.status(200).json({ success: true, message: "Supported By item deleted" });
  } catch (error) {
    next(error);
  }
};
