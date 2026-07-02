import { Sponser } from "../models/sponsor.model.js";

/**
 * @desc Create Sponsor
 * @route POST /api/sponsors
 */
export const createSponsor = async (req, res) => {
    try {
        const { title, salutation } = req.body;

        if (!title || title.trim().length < 3 || title.trim().length > 30) {
            return res.status(400).json({
                success: false,
                message: "Title must be between 3 and 30 characters.",
            });
        }

        if (!salutation || salutation.trim().length < 3 || salutation.trim().length > 30) {
            return res.status(400).json({
                success: false,
                message: "Salutation must be between 3 and 30 characters.",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Sponsor logo is required.",
            });
        }

        const sponsor = await Sponser.create({
            image: req.file.path,
            title: title.trim(),
            salutation: salutation.trim(),
        });

        return res.status(201).json({
            success: true,
            message: "Sponsor created successfully.",
            data: sponsor,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @desc Get All Sponsors
 * @route GET /api/sponsors
 */
export const getSponsors = async (req, res) => {
    try {
        const sponsors = await Sponser.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: sponsors.length,
            data: sponsors,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @desc Get Single Sponsor
 * @route GET /api/sponsors/:id
 */
export const getSponsorById = async (req, res) => {
    try {
        const sponsor = await Sponser.findById(req.params.id);

        if (!sponsor) {
            return res.status(404).json({
                success: false,
                message: "Sponsor not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: sponsor,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @desc Update Sponsor
 * @route PUT /api/sponsors/:id
 */
export const updateSponsor = async (req, res) => {
    try {

        const sponsor = await Sponser.findById(req.params.id);

        if (!sponsor) {
            return res.status(404).json({
                success: false,
                message: "Sponsor not found.",
            });
        }

        const { title, salutation } = req.body;

        if (title) sponsor.title = title.trim();

        if (salutation) sponsor.salutation = salutation.trim();

        if (req.file) {
            sponsor.image = req.file.path;
        }

        await sponsor.save();

        return res.status(200).json({
            success: true,
            message: "Sponsor updated successfully.",
            data: sponsor,
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * @desc Delete Sponsor
 * @route DELETE /api/sponsors/:id
 */
export const deleteSponsor = async (req, res) => {
    try {

        const sponsor = await Sponser.findById(req.params.id);

        if (!sponsor) {
            return res.status(404).json({
                success: false,
                message: "Sponsor not found.",
            });
        }

        await sponsor.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Sponsor deleted successfully.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};