import { useEffect, useState } from "react";
import SponsorForm from "../components/SponsorForm";
import SponsorTable from "../components/SponsorTable";
import { getSponsors } from "../../api/api";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSponsor, setEditingSponsor] = useState(null);

  const fetchSponsors = async () => {
    try {
      setLoading(true);
      const res = await getSponsors();
      setSponsors(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSponsors();
  }, []);

  const handleEdit = (sponsor) => {
    setEditingSponsor(sponsor);
  };

  const handleCancelEdit = () => {
    setEditingSponsor(null);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Sponsors</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div>
          <SponsorForm
            onSuccess={() => {
              fetchSponsors();
              setEditingSponsor(null);
            }}
            editData={editingSponsor}
            onCancel={handleCancelEdit}
          />
        </div>
        <div className="lg:col-span-2">
          <SponsorTable
            sponsors={sponsors}
            loading={loading}
            refresh={fetchSponsors}
            onEdit={handleEdit}
          />
        </div>
      </div>
    </div>
  );
}