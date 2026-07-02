import fs from "fs";
import cloudinary from "../config/cloudinary.js";
import { Sponsor } from "../models/sponsor.model.js";

/* ---------------- CREATE ---------------- */

export const createSponsor = async (req, res) => {

    try {

        const { title, salutation } = req.body;

        if (!title || !salutation)
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });

        if (!req.file)
            return res.status(400).json({
                success: false,
                message: "Image is required",
            });

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

        return res.status(201).json({
            success: true,
            data: sponsor,
        });

    } catch (error) {

        console.log(error);

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

/* ---------------- GET ALL ---------------- */

export const getSponsors = async (req, res) => {

    try {

        const sponsors = await Sponsor.find().sort({
            createdAt: -1,
        });

        return res.status(200).json({
            success: true,
            count: sponsors.length,
            data: sponsors,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

/* ---------------- GET ONE ---------------- */

export const getSponsorById = async (req, res) => {

    try {

        const sponsor = await Sponsor.findById(req.params.id);

        if (!sponsor)
            return res.status(404).json({
                success: false,
                message: "Sponsor not found",
            });

        return res.status(200).json({
            success: true,
            data: sponsor,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

/* ---------------- UPDATE ---------------- */

export const updateSponsor = async (req, res) => {

    try {

        const sponsor = await Sponsor.findById(req.params.id);

        if (!sponsor)
            return res.status(404).json({
                success: false,
                message: "Sponsor not found",
            });

        if (req.body.title)
            sponsor.title = req.body.title;

        if (req.body.salutation)
            sponsor.salutation = req.body.salutation;

        if (req.file) {

            await cloudinary.uploader.destroy(
                sponsor.imagePublicId
            );

            const result = await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder: "Sponsors",
                }
            );

            fs.unlinkSync(req.file.path);

            sponsor.image = result.secure_url;
            sponsor.imagePublicId = result.public_id;

        }

        await sponsor.save();

        return res.status(200).json({
            success: true,
            message: "Sponsor updated successfully",
            data: sponsor,
        });

    } catch (error) {

        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};

/* ---------------- DELETE ---------------- */

export const deleteSponsor = async (req, res) => {

    try {

        const sponsor = await Sponsor.findById(req.params.id);

        if (!sponsor)
            return res.status(404).json({
                success: false,
                message: "Sponsor not found",
            });

        await cloudinary.uploader.destroy(
            sponsor.imagePublicId
        );

        await sponsor.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Sponsor deleted successfully",
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Server Error",
        });

    }

};