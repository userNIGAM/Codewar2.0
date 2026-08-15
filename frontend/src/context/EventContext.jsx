import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentEvent } from "../api/api";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchEvent = async () => {
    try {
      const { data } = await getCurrentEvent();

      if (data.success && data.data) {
        const date = new Date(data.data.eventDate);

        setEvent({
          ...data.data,
          year: data.data.year,
          month: date.getMonth() + 1,
          day: date.getDate(),
        });
      } else {
        setEvent(null);
      }
    } catch (err) {
      console.error(err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  return (
    <EventContext.Provider
      value={{
        event,
        loading,
        refreshEvent: fetchEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);