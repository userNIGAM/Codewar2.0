import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { deleteSponsor } from "../../api/api";
import ConfirmModal from "./ConfirmModal";
import { useState } from "react";

export default function SponsorTable({ sponsors, loading, refresh, onEdit }) {
  const [deleteId, setDeleteId] = useState(null);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    try {
      await deleteSponsor(deleteId);
      toast.success("Deleted Successfully");
      refresh();
    } catch {
      toast.error("Delete Failed");
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-8 shadow animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-slate-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (!sponsors.length) {
    return <div className="bg-white rounded-xl p-8 shadow text-center text-slate-500">No Sponsors Found</div>;
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Logo</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sponsors.map((item) => (
              <tr key={item._id} className="border-t hover:bg-slate-50">
                <td className="p-4">
                  <img src={item.image} className="w-14 h-14 object-contain" alt={item.title} />
                </td>
                <td className="p-4 font-medium">{item.title}</td>
                <td className="p-4">{item.salutation}</td>
                <td className="p-4">
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={() => onEdit(item)}
                      className="p-2 rounded-full hover:bg-blue-50 transition"
                      title="Edit"
                    >
                      <Pencil size={18} className="text-blue-500" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="p-2 rounded-full hover:bg-red-50 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} className="text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Delete Sponsor"
        message="Are you sure you want to delete this sponsor? This action cannot be undone."
      />
    </>
  );
}