import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setCountdown, getCountdown } from "../../api/api";

export default function CountdownForm({ onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [calendarSystem, setCalendarSystem] = useState("AD");
  const [currentCountdown, setCurrentCountdown] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      adYear: new Date().getFullYear(),
      adMonth: 1,
      adDate: 1,
      adHours: 0,
      bsYear: new Date().getFullYear() + 56,
      bsMonth: 1,
      bsDate: 1,
      bsHours: 0,
    }
  });

  // Fetch current countdown on mount
  useEffect(() => {
    const fetchCountdown = async () => {
      try {
        setFetchLoading(true);
        const response = await getCountdown();
        if (response.data.success) {
          setCurrentCountdown(response.data.data);
          setCalendarSystem(response.data.data.activeCalendar);
          reset({
            adYear: response.data.data.adYear,
            adMonth: response.data.data.adMonth,
            adDate: response.data.data.adDate,
            adHours: response.data.data.adHours,
            bsYear: response.data.data.bsYear,
            bsMonth: response.data.data.bsMonth,
            bsDate: response.data.data.bsDate,
            bsHours: response.data.data.bsHours,
          });
        }
      } catch (error) {
        console.log("No countdown set yet or unable to fetch");
        // Initialize with default values
        reset({
          adYear: new Date().getFullYear(),
          adMonth: 1,
          adDate: 1,
          adHours: 0,
          bsYear: new Date().getFullYear() + 56,
          bsMonth: 1,
          bsDate: 1,
          bsHours: 0,
        });
      } finally {
        setFetchLoading(false);
      }
    };
    fetchCountdown();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        activeCalendar: calendarSystem,
        adYear: parseInt(data.adYear),
        adMonth: parseInt(data.adMonth),
        adDate: parseInt(data.adDate),
        adHours: parseInt(data.adHours),
        bsYear: parseInt(data.bsYear),
        bsMonth: parseInt(data.bsMonth),
        bsDate: parseInt(data.bsDate),
        bsHours: parseInt(data.bsHours),
      };

      const response = await setCountdown(payload);

      if (response.data.success) {
        toast.success("Countdown set successfully!");
        setCurrentCountdown(response.data.data);
        onSuccess?.();
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || "Failed to set countdown";
      
      if (error.response?.status === 401) {
        toast.error("Unauthorized! Please login again.");
      } else {
        toast.error(errorMsg);
      }
      
      console.error("Countdown error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Set Event Countdown</h2>

      {fetchLoading && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">Loading current countdown...</p>
        </div>
      )}

      {currentCountdown && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Current Target:</strong> {currentCountdown.activeCalendar === "AD"
              ? `${currentCountdown.adDate}/${currentCountdown.adMonth}/${currentCountdown.adYear} at ${currentCountdown.adHours}:00`
              : `${currentCountdown.bsDate}/${currentCountdown.bsMonth}/${currentCountdown.bsYear} at ${currentCountdown.bsHours}:00`
            } ({currentCountdown.activeCalendar})
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Calendar Selection */}
        <div>
          <label className="font-semibold text-lg mb-4 block">Select Calendar System</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="AD"
                checked={calendarSystem === "AD"}
                onChange={(e) => setCalendarSystem(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-medium">Gregorian (AD)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                value="BS"
                checked={calendarSystem === "BS"}
                onChange={(e) => setCalendarSystem(e.target.value)}
                className="w-4 h-4"
              />
              <span className="font-medium">Bikram Sambat (BS)</span>
            </label>
          </div>
        </div>

        {/* AD Fields */}
        {calendarSystem === "AD" && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-4">Gregorian (AD) Date & Time</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Year</label>
                <input
                  type="number"
                  min="2024"
                  max="2100"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="2026"
                  {...register("adYear", {
                    required: "Year is required",
                    min: { value: 2024, message: "Year must be 2024 or later" },
                  })}
                />
                {errors.adYear && <p className="text-red-500 text-xs mt-1">{errors.adYear.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Month</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="1-12"
                  {...register("adMonth", {
                    required: "Month is required",
                    min: { value: 1, message: "Month must be 1-12" },
                    max: { value: 12, message: "Month must be 1-12" },
                  })}
                />
                {errors.adMonth && <p className="text-red-500 text-xs mt-1">{errors.adMonth.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Date</label>
                <input
                  type="number"
                  min="1"
                  max="31"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="1-31"
                  {...register("adDate", {
                    required: "Date is required",
                    min: { value: 1, message: "Date must be 1-31" },
                    max: { value: 31, message: "Date must be 1-31" },
                  })}
                />
                {errors.adDate && <p className="text-red-500 text-xs mt-1">{errors.adDate.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="0-23"
                  {...register("adHours", {
                    required: "Hours is required",
                    min: { value: 0, message: "Hours must be 0-23" },
                    max: { value: 23, message: "Hours must be 0-23" },
                  })}
                />
                {errors.adHours && <p className="text-red-500 text-xs mt-1">{errors.adHours.message}</p>}
              </div>
            </div>
          </div>
        )}

        {/* BS Fields */}
        {calendarSystem === "BS" && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-4">Bikram Sambat (BS) Date & Time</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Year</label>
                <input
                  type="number"
                  min="2080"
                  max="2156"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="2083"
                  {...register("bsYear", {
                    required: "Year is required",
                  })}
                />
                {errors.bsYear && <p className="text-red-500 text-xs mt-1">{errors.bsYear.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Month</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="1-12"
                  {...register("bsMonth", {
                    required: "Month is required",
                    min: { value: 1, message: "Month must be 1-12" },
                    max: { value: 12, message: "Month must be 1-12" },
                  })}
                />
                {errors.bsMonth && <p className="text-red-500 text-xs mt-1">{errors.bsMonth.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Date</label>
                <input
                  type="number"
                  min="1"
                  max="32"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="1-32"
                  {...register("bsDate", {
                    required: "Date is required",
                    min: { value: 1, message: "Date must be 1-32" },
                    max: { value: 32, message: "Date must be 1-32" },
                  })}
                />
                {errors.bsDate && <p className="text-red-500 text-xs mt-1">{errors.bsDate.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Hours</label>
                <input
                  type="number"
                  min="0"
                  max="23"
                  className="w-full border rounded-lg p-3 text-gray-900 focus:ring-2 focus:ring-cyan-500 outline-none"
                  placeholder="0-23"
                  {...register("bsHours", {
                    required: "Hours is required",
                    min: { value: 0, message: "Hours must be 0-23" },
                    max: { value: 23, message: "Hours must be 0-23" },
                  })}
                />
                {errors.bsHours && <p className="text-red-500 text-xs mt-1">{errors.bsHours.message}</p>}
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition-colors"
        >
          {loading ? "Setting Countdown..." : "Set Countdown"}
        </button>
      </form>
    </div>
  );
}
