import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { Sponsor } from "../models/sponsor.model.js";

export const createSponsor = async (req, res, next) => {
  try {
    const { title, salutation } = req.body;

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
      folder: "Sponsors",
    });
    fs.unlinkSync(req.file.path);

    const sponsor = await Sponsor.create({
      title,
      salutation,
      image: result.secure_url,
      imagePublicId: result.public_id,
    });

    res.status(201).json({ success: true, data: sponsor });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const getSponsors = async (req, res, next) => {
  try {
    const sponsors = await Sponsor.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: sponsors.length, data: sponsors });
  } catch (error) {
    next(error);
  }
};

export const getSponsorById = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ success: false, message: "Sponsor not found" });
    }
    res.status(200).json({ success: true, data: sponsor });
  } catch (error) {
    next(error);
  }
};

export const updateSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ success: false, message: "Sponsor not found" });
    }

    if (req.body.title) sponsor.title = req.body.title;
    if (req.body.salutation) sponsor.salutation = req.body.salutation;

    if (req.file) {
      // Delete old image from Cloudinary
      await cloudinary.uploader.destroy(sponsor.imagePublicId);
      const result = await cloudinary.uploader.upload(req.file.path, { folder: "Sponsors" });
      fs.unlinkSync(req.file.path);
      sponsor.image = result.secure_url;
      sponsor.imagePublicId = result.public_id;
    }

    await sponsor.save();
    res.status(200).json({ success: true, data: sponsor });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

export const deleteSponsor = async (req, res, next) => {
  try {
    const sponsor = await Sponsor.findById(req.params.id);
    if (!sponsor) {
      return res.status(404).json({ success: false, message: "Sponsor not found" });
    }
    await cloudinary.uploader.destroy(sponsor.imagePublicId);
    await sponsor.deleteOne();
    res.status(200).json({ success: true, message: "Sponsor deleted" });
  } catch (error) {
    next(error);
  }
};