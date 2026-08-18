import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Advisor = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Please enter advisor name");
      return;
    }

    if (!role.trim()) {
      toast.error("Please enter advisor role");
      return;
    }

    if (!image) {
      toast.error("Please select an advisor image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", name);
      formData.append("role", role);
      formData.append("image", image);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/advisors`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      toast.success("Advisor added successfully!");

      // Reset form
      setName("");
      setRole("");
      setImage(null);

      // Reset file input
      e.target.reset();
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Failed to add advisor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Add Advisor</h2>

        <p className="text-slate-500 mb-6">Add a new advisor to the website.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Advisor Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter advisor name"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Advisor Role
            </label>

            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Advisor Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg"
            />

            {image && (
              <p className="text-sm text-slate-500 mt-2">
                Selected: {image.name}
              </p>
            )}
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Adding Advisor..." : "Add Advisor"}
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default Advisor;
