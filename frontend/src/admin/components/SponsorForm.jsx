import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createSponsor, updateSponsor } from "../../api/api";

export default function SponsorForm({ onSuccess, editData, onCancel }) {
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
        title: editData.title,
        salutation: editData.salutation,
      });
      setPreview(editData.image);
    } else {
      reset({ title: "", salutation: "" });
      setPreview(null);
    }
  }, [editData, reset]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("salutation", data.salutation);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      if (isEditing) {
        await updateSponsor(editData._id, formData);
        toast.success("Sponsor Updated Successfully");
      } else {
        await createSponsor(formData);
        toast.success("Sponsor Added Successfully");
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
        {isEditing ? "Edit Sponsor" : "Add New Sponsor"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="font-semibold">Sponsor Name</label>
          <input
            className="w-full mt-2 border rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            placeholder="Google"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
              maxLength: { value: 30, message: "Maximum 30 characters" },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="font-semibold">Sponsor Type</label>
          <input
            className="w-full mt-2 border rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 outline-none"
            placeholder="Technology Partner"
            {...register("salutation", {
              required: "Type is required",
              minLength: { value: 3, message: "Minimum 3 characters" },
              maxLength: { value: 30, message: "Maximum 30 characters" },
            })}
          />
          {errors.salutation && (
            <p className="text-red-500 text-sm mt-1">
              {errors.salutation.message}
            </p>
          )}
        </div>

        <div>
          <label className="font-semibold">Sponsor Logo</label>
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
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-contain border rounded-lg"
          />
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
