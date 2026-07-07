import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

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