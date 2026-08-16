import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;

export const createSponsor = (formData) =>
  api.post("/sponsors", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getSponsors = () => api.get("/api/sponsors");
export const getSponsor = (id) => api.get(`/api/sponsors/${id}`);
export const deleteSponsor = (id) => api.delete(`/api/sponsors/${id}`);
export const updateSponsor = (id, formData) =>
  api.put(`/api/sponsors/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const createSupportedBy = (formData) =>
  api.post("/api/supported-by", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getSupportedBy = () => api.get("/api/supported-by");
export const getSupportedByItem = (id) => api.get(`/api/supported-by/${id}`);
export const deleteSupportedBy = (id) => api.delete(`/api/supported-by/${id}`);
export const updateSupportedBy = (id, formData) =>
  api.put(`/api/supported-by/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const loginAdmin = (payload) => api.post("/api/auth/login", payload);
export const getAdminMe = () => api.get("/api/auth/me");
export const logoutAdmin = () => api.post("/api/auth/logout");

// Countdown APIs
export const getCountdown = () => api.get("/api/countdown");
export const setCountdown = (payload) => api.post("/api/countdown/set", payload);
export const toggleCountdown = () => api.put("/api/countdown/toggle");

// Award APIs
export const getAwards = () => api.get("/api/awards");
export const updateAwards = (payload) => api.put("/api/awards", payload);

// Event APIs
// Event APIs

export const getCurrentEvent = () => api.get("/api/events/current");
export const getEvents = () => api.get("/api/events");
export const saveEvent = (payload) => api.post("/api/events", payload);
export const deleteEvent = (id) => api.delete(`/api/events/${id}`);
