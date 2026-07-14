import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Plus, Trash2 } from "lucide-react";

import { getAwards, updateAwards } from "../../api/api";

const defaultAward = (title, position, gradient, glow) => ({
  title,
  position,
  gradient,
  glow,
  items: [""],
});

const defaultState = {
  note:
    "Please note that the prizes and awards are subject to change as per the event requirements.",
  isPublished: true,

  awards: [
    defaultAward(
      "Winner",
      "winner",
      "from-yellow-300 via-yellow-400 to-amber-500",
      "shadow-yellow-500/30"
    ),

    defaultAward(
      "First Runner Up",
      "first_runner_up",
      "from-cyan-300 via-sky-400 to-cyan-500",
      "shadow-cyan-500/30"
    ),

    defaultAward(
      "Second Runner Up",
      "second_runner_up",
      "from-orange-400 via-orange-500 to-amber-600",
      "shadow-orange-500/30"
    ),
  ],
};

export default function Awards() {
  const [data, setData] = useState(defaultState);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAwards();
  }, []);

  const fetchAwards = async () => {
    try {
      const res = await getAwards();

      if (res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const updateField = (awardIndex, key, value) => {
    const updated = [...data.awards];
    updated[awardIndex][key] = value;

    setData({
      ...data,
      awards: updated,
    });
  };

  const updatePrize = (awardIndex, prizeIndex, value) => {
    const updated = [...data.awards];

    updated[awardIndex].items[prizeIndex] = value;

    setData({
      ...data,
      awards: updated,
    });
  };

  const addPrize = (awardIndex) => {
    const updated = [...data.awards];

    updated[awardIndex].items.push("");

    setData({
      ...data,
      awards: updated,
    });
  };

  const removePrize = (awardIndex, prizeIndex) => {
    const updated = [...data.awards];

    updated[awardIndex].items.splice(prizeIndex, 1);

    setData({
      ...data,
      awards: updated,
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      await updateAwards(data);

      toast.success("Awards updated successfully");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Unable to save awards"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Awards Section
        </h1>

        <p className="mt-2 text-gray-500">
          Manage all prizes shown on the homepage.
        </p>
      </div>

      {data.awards.map((award, awardIndex) => (
        <div
          key={award.position}
          className="rounded-2xl border bg-white p-6 shadow-sm"
        >
          <h2 className="mb-6 text-xl font-bold">
            {award.title}
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <div>
              <label className="mb-2 block font-medium">
                Title
              </label>

              <input
                value={award.title}
                onChange={(e) =>
                  updateField(
                    awardIndex,
                    "title",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Position
              </label>

              <input
                disabled
                value={award.position}
                className="w-full rounded-lg border bg-gray-100 p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Gradient
              </label>

              <input
                value={award.gradient}
                onChange={(e) =>
                  updateField(
                    awardIndex,
                    "gradient",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Glow
              </label>

              <input
                value={award.glow}
                onChange={(e) =>
                  updateField(
                    awardIndex,
                    "glow",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          <div className="mt-8">

            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">
                Prize Items
              </h3>

              <button
                onClick={() => addPrize(awardIndex)}
                className="flex items-center gap-2 rounded-lg bg-cyan-500 px-4 py-2 text-white"
              >
                <Plus size={18} />
                Add Prize
              </button>
            </div>

            <div className="space-y-3">

              {award.items.map((item, prizeIndex) => (
                <div
                  key={prizeIndex}
                  className="flex gap-3"
                >
                  <input
                    value={item}
                    onChange={(e) =>
                      updatePrize(
                        awardIndex,
                        prizeIndex,
                        e.target.value
                      )
                    }
                    placeholder="Prize"
                    className="flex-1 rounded-lg border p-3"
                  />

                  <button
                    onClick={() =>
                      removePrize(
                        awardIndex,
                        prizeIndex
                      )
                    }
                    className="rounded-lg bg-red-500 px-4 text-white"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="rounded-2xl border bg-white p-6">

        <label className="mb-2 block font-semibold">
          Note
        </label>

        <textarea
          rows={4}
          value={data.note}
          onChange={(e) =>
            setData({
              ...data,
              note: e.target.value,
            })
          }
          className="w-full rounded-lg border p-4"
        />

        <div className="mt-5 flex items-center gap-3">
          <input
            type="checkbox"
            checked={data.isPublished}
            onChange={(e) =>
              setData({
                ...data,
                isPublished: e.target.checked,
              })
            }
          />

          <span>Publish Awards</span>
        </div>
      </div>

      <div className="flex justify-end">

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-cyan-500 px-8 py-3 font-semibold text-white hover:bg-cyan-600 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  );
}