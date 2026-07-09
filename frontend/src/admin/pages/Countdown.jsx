import { useState } from "react";
import CountdownForm from "../components/CountdownForm";

export default function Countdown() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Event Countdown Settings</h1>
      <p className="text-gray-600 mb-8">
        Set the event countdown date and time. The countdown will display on the homepage and count down to the specified date.
      </p>

      <CountdownForm key={refreshKey} onSuccess={handleSuccess} />
    </div>
  );
}
