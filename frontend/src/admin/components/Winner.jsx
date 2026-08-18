import { useEffect, useRef, useState } from "react";
import { Plus, Pencil, Trash2, X, Upload, Trophy } from "lucide-react";
import toast from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

const positionNames = {
  1: "Winner",
  2: "1st Runner Up",
  3: "2nd Runner Up",
};

const positionBadges = {
  1: "WINNER",
  2: "1ST RUNNER UP",
  3: "2ND RUNNER UP",
};

export default function WinnersAdmin() {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWinner, setEditingWinner] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [form, setForm] = useState({
    title: "",
    position: "1",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  // ====================================
  // FETCH WINNERS
  // ====================================
  const fetchWinners = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/winners`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch winners");
      }
      setWinners(data.winners || []);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to load winners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  // ====================================
  // OPEN ADD FORM
  // ====================================
  const openAddForm = () => {
    setEditingWinner(null);
    setForm({
      title: "",
      position: "1",
      image: null,
    });
    setPreview(null);
    setShowForm(true);
  };

  // ====================================
  // OPEN EDIT FORM
  // ====================================
  const openEditForm = (winner) => {
    setEditingWinner(winner);
    setForm({
      title: winner.title,
      position: String(winner.position),
      image: null,
    });

    setPreview(winner.image?.url || null);
    setShowForm(true);
  };

  // ====================================
  // CLOSE FORM
  // ====================================
  const closeForm = () => {
    if (saving) return;
    setShowForm(false);
    setEditingWinner(null);
    setPreview(null);

    setForm({
      title: "",
      position: "1",
      image: null,
    });
  };

  // ====================================
  // INPUT CHANGE
  // ====================================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ====================================
  // IMAGE CHANGE
  // ====================================
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image");

      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB");

      e.target.value = "";
      return;
    }

    setForm((previous) => ({
      ...previous,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  // ====================================
  // SUBMIT
  // ====================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Winner title is required");
      return;
    }

    if (!editingWinner && !form.image) {
      toast.error("Winner image is required");
      return;
    }

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", form.title.trim());

      formData.append("position", form.position);

      if (form.image) {
        formData.append("image", form.image);
      }

      const url = editingWinner
        ? `${API_URL}/api/winners/${editingWinner._id}`
        : `${API_URL}/api/winners`;

      const method = editingWinner ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to save winner");
      }

      toast.success(
        editingWinner
          ? "Winner updated successfully"
          : "Winner added successfully",
      );

      closeForm();

      fetchWinners();
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // ====================================
  // DELETE
  // ====================================
  const handleDelete = async (winner) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${winner.title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(winner._id);

      const response = await fetch(`${API_URL}/api/winners/${winner._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete winner");
      }

      toast.success("Winner deleted successfully");

      setWinners((previous) =>
        previous.filter((item) => item._id !== winner._id),
      );
    } catch (error) {
      console.error(error);

      toast.error(error.message || "Failed to delete winner");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-6 text-white md:p-10">
      {/* ================================= */}
      {/* HEADER */}
      {/* ================================= */}

      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10">
              <Trophy className="h-6 w-6 text-cyan-400" />
            </div>

            <h1 className="text-3xl font-bold">Winners</h1>
          </div>

          <p className="text-slate-400">Manage CodeWar 2.0 winners.</p>
        </div>

        <button
          onClick={openAddForm}
          className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          <Plus className="h-5 w-5" />
          Add Winner
        </button>
      </div>

      {/* ================================= */}
      {/* LOADING */}
      {/* ================================= */}

      {loading && (
        <div className="flex justify-center py-20">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-400 border-t-transparent" />
        </div>
      )}

      {/* ================================= */}
      {/* EMPTY */}
      {/* ================================= */}

      {!loading && winners.length === 0 && (
        <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/50 py-20 text-center">
          <Trophy className="mx-auto mb-4 h-12 w-12 text-slate-600" />

          <h2 className="text-xl font-semibold">No winners yet</h2>

          <p className="mt-2 text-slate-500">Add your first CodeWar winner.</p>
        </div>
      )}

      {/* ================================= */}
      {/* WINNER CARDS */}
      {/* ================================= */}

      {!loading && winners.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {winners.map((winner) => (
            <div
              key={winner._id}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900"
            >
              {/* IMAGE */}

              <div className="relative h-64 overflow-hidden">
                <img
                  src={winner.image?.url}
                  alt={winner.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 to-transparent" />

                {/* POSITION */}

                <span className="absolute left-4 top-4 rounded-full bg-cyan-400 px-3 py-1.5 text-xs font-bold text-slate-950">
                  {positionBadges[winner.position]}
                </span>
              </div>

              {/* CONTENT */}

              <div className="p-5">
                <h2 className="text-xl font-bold text-cyan-300">
                  {winner.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Position #{winner.position}
                </p>

                {/* ACTIONS */}

                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => openEditForm(winner)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-700 px-4 py-2.5 text-sm font-medium transition hover:border-cyan-400 hover:text-cyan-300"
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(winner)}
                    disabled={deleting === winner._id}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-500/20 px-4 py-2.5 text-sm font-medium text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
                  >
                    {deleting === winner._id ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================================= */}
      {/* MODAL */}
      {/* ================================= */}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-slate-800 p-6">
              <div>
                <h2 className="text-xl font-bold">
                  {editingWinner ? "Edit Winner" : "Add Winner"}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {editingWinner
                    ? "Update winner information."
                    : "Add a CodeWar 2.0 winner."}
                </p>
              </div>

              <button
                onClick={closeForm}
                disabled={saving}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* FORM */}

            <form onSubmit={handleSubmit} className="space-y-6 p-6">
              {/* TITLE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Winner Name
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Winner"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400"
                />
              </div>

              {/* POSITION */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Position
                </label>

                <select
                  name="position"
                  value={form.position}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
                >
                  <option value="1">Winner</option>

                  <option value="2">1st Runner Up</option>

                  <option value="3">2nd Runner Up</option>
                </select>
              </div>

              {/* IMAGE */}

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-300">
                  Winner Image
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer overflow-hidden rounded-xl border-2 border-dashed border-slate-700 bg-slate-950 transition hover:border-cyan-400"
                >
                  {preview ? (
                    <div className="relative">
                      <img
                        src={preview}
                        alt="Preview"
                        className="h-64 w-full object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition hover:opacity-100">
                        <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-sm">
                          <Upload className="h-4 w-4" />
                          Change image
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-56 flex-col items-center justify-center">
                      <Upload className="mb-3 h-10 w-10 text-slate-600" />

                      <p className="font-medium text-slate-300">
                        Click to upload
                      </p>

                      <p className="mt-1 text-xs text-slate-600">
                        PNG, JPG or WEBP · Max 2MB
                      </p>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>

              {/* BUTTONS */}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  className="flex-1 rounded-xl border border-slate-700 px-5 py-3 font-medium text-slate-300 transition hover:bg-slate-800 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving && (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                  )}

                  {saving
                    ? "Saving..."
                    : editingWinner
                      ? "Update Winner"
                      : "Add Winner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
