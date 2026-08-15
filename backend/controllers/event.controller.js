import Event from "../models/Event.js";

export const createOrUpdateEvent = async (req, res) => {
  try {
    const { year, eventDate, calendarType } = req.body;

    const event = await Event.findOneAndUpdate(
      { year },
      {
        year,
        eventDate,
        calendarType,
      },
      {
        new: true,
        upsert: true,
      }
    );

    res.json({
      success: true,
      data: event,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getEvents = async (req, res) => {
  const events = await Event.find().sort({ year: 1 });

  res.json({
    success: true,
    data: events,
  });
};

export const getCurrentEvent = async (req, res) => {
  const year = new Date().getFullYear();

  const event = await Event.findOne({ year });

  res.json({
    success: true,
    data: event,
  });
};

export const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
  });
};