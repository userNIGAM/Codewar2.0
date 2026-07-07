import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createSupportedBy, updateSupportedBy } from "../../api/api";

export default function SupportedByForm({ onSuccess, editData, onCancel }) {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const isEditing = !!editData;

  useEffect(() => {
    if (editData) {
      reset({
        name: editData.name,
        role: editData.role,
      });
      setPreview(editData.image);
    } else {
      reset({ name: "", role: "" });
      setPreview(null);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (isEditing) {
        await updateSupportedBy(editData._id, formData);
        toast.success("Supported By item updated successfully");
      } else {
        await createSupportedBy(formData);
        toast.success("Supported By item added successfully");
      }

      reset();
      setPreview(null);
      onSuccess?.();
      if (isEditing && onCancel) onCancel();
    } catch (error) {
      toast.error(error.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <h2 className="text-xl font-bold mb-4">
        {isEditing ? "Edit Supported By Item" : "Add New Supported By Item"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-semibold">Name</label>
          <input
            className="w-full mt-2 border rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            placeholder="BIM - Mechi Multiple Campus"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
              maxLength: { value: 60, message: "Maximum 60 characters" },
            })}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Role / Type</label>
          <input
            className="w-full mt-2 border rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            placeholder="Community Partner"
            {...register("role", {
              required: "Role is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
              maxLength: { value: 40, message: "Maximum 40 characters" },
            })}
          />
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
        </div>

        <div>
          <label className="font-semibold">Logo</label>
          <input
            type="file"
            accept="image/*"
            className="mt-3 block"
            {...register("image", {
              required: !isEditing && "Image is required",
            })}
            onChange={(e) => {
              register("image").onChange(e);
              if (e.target.files[0]) {
                setPreview(URL.createObjectURL(e.target.files[0]));
              } else if (!isEditing) {
                setPreview(null);
              }
            }}
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {preview && (
          <img src={preview} alt="Preview" className="w-40 h-40 object-contain border rounded-lg" />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 text-white px-8 py-3 rounded-lg hover:bg-cyan-600 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : isEditing ? "Update" : "Create"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
