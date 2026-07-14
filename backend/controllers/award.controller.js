import Award from "../models/Award.js";

export const getAward = async (req, res) => {
  try {
    let award = await Award.findOne();

    if (!award) {
      award = await Award.create({
        note:
          "Please note that the prizes and awards are subject to change as per the event requirements.",

        isPublished: true,

        awards: [
          {
            title: "Winner",
            position: "winner",
            icon: "crown",
            gradient: "from-yellow-300 via-yellow-400 to-amber-500",
            glow: "shadow-yellow-500/30",
            items: [],
          },
          {
            title: "First Runner Up",
            position: "first_runner_up",
            icon: "trophy",
            gradient: "from-cyan-300 via-sky-400 to-cyan-500",
            glow: "shadow-cyan-500/30",
            items: [],
          },
          {
            title: "Second Runner Up",
            position: "second_runner_up",
            icon: "medal",
            gradient: "from-orange-400 via-orange-500 to-amber-600",
            glow: "shadow-orange-500/30",
            items: [],
          },
        ],
      });
    }

    res.status(200).json(award);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAward = async (req, res) => {
  try {
    let award = await Award.findOne();

    if (!award) {
      award = await Award.create(req.body);
    } else {
      award = await Award.findByIdAndUpdate(
        award._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    res.status(200).json({
      success: true,
      message: "Awards updated successfully.",
      data: award,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};