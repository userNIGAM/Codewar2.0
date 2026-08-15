// src/utils/event.js

import { getCurrentEvent } from "../api/api";

export const getEventData = async () => {
  const { data } = await getCurrentEvent();

  if (!data.data) return null;

  const event = data.data;
  const date = new Date(event.eventDate);

  return {
    year: event.year,
    month: date.getMonth() + 1,
    day: date.getDate(),
    fullDate: date,
    calendarType: event.calendarType,
  };
};