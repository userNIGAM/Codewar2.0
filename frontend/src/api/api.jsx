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

export const getSponsors = () => api.get("/sponsors");
export const getSponsor = (id) => api.get(`/sponsors/${id}`);
export const deleteSponsor = (id) => api.delete(`/sponsors/${id}`);
export const updateSponsor = (id, formData) =>
  api.put(`/sponsors/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const createSupportedBy = (formData) =>
  api.post("/supported-by", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getSupportedBy = () => api.get("/supported-by");
export const getSupportedByItem = (id) => api.get(`/supported-by/${id}`);
export const deleteSupportedBy = (id) => api.delete(`/supported-by/${id}`);
export const updateSupportedBy = (id, formData) =>
  api.put(`/supported-by/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const loginAdmin = (payload) => api.post("/auth/login", payload);
export const getAdminMe = () => api.get("/auth/me");
export const logoutAdmin = () => api.post("/auth/logout");

// Countdown APIs
export const getCountdown = () => api.get("/countdown");
export const setCountdown = (payload) => api.post("/countdown/set", payload);
export const toggleCountdown = () => api.put("/countdown/toggle");

// Award APIs
export const getAwards = () => api.get("/awards");
export const updateAwards = (payload) => api.put("/awards", payload);
