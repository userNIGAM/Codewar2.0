import { useEffect, useState } from "react";
import SupportedByForm from "../components/SupportedByForm";
import SupportedByTable from "../components/SupportedByTable";
import { getSupportedBy } from "../../api/api";

export default function SupportedBy() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const res = await getSupportedBy();
      setItems(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Supported By</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div>
          <SupportedByForm
            onSuccess={() => {
              fetchItems();
              setEditingItem(null);
            }}
            editData={editingItem}
            onCancel={handleCancelEdit}
          />
        </div>
        <div className="lg:col-span-2">
          <SupportedByTable
            items={items}
            loading={loading}
            refresh={fetchItems}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}
