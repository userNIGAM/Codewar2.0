import { useState } from "react";
import { saveEvent } from "../../api/api";

export default function EventDate() {
  const [year, setYear] = useState(new Date().getFullYear());

  const [eventDate, setEventDate] = useState("");

  const [calendarType, setCalendarType] = useState("AD");

  const handleSubmit = async () => {
    await saveEvent({
      year,
      eventDate,
      calendarType,
    });

    alert("Saved!");
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold mb-5">Event Settings</h2>

      <div className="space-y-4">
        <div>
          <label>Year</label>

          <input
            type="number"
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Event Date</label>

          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="w-full border rounded-lg p-2"
          />
        </div>

        <div>
          <label>Calendar</label>

          <select
            value={calendarType}
            onChange={(e) => setCalendarType(e.target.value)}
            className="w-full border rounded-lg p-2"
          >
            <option>AD</option>
            <option>BS</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white rounded-lg w-full py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}
