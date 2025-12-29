import React, { useEffect, useState } from "react";
import Dropdown from "@/components/DropDown";
import {
  CATEGORIES,
  DEPARTMENTS,
  UNITS_BY_CATEGORY,
} from "@/constants/activity.constants";
import { submitActivity } from "@/api/activity.api";

const AddActivity = () => {
  const [form, setForm] = useState({
    category: "",
    value: "",
    unit: "",
    date: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);
  const [snowflakes, setSnowflakes] = useState<number[]>([]);

  /* ❄️ Lightweight snowflakes (CSS driven, minimal JS) */
  useEffect(() => {
    setSnowflakes(Array.from({ length: 35 }, (_, i) => i));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) || "" : value,
    }));
  };

  const isFormValid =
    form.category &&
    form.value &&
    form.unit &&
    form.date &&
    form.department &&
    Number(form.value) > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      setLoading(true);
      await submitActivity(form);

      alert("Activity saved successfully!");

      setForm({
        category: "",
        value: "",
        unit: "",
        date: "",
        department: "",
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save activity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-white flex items-center justify-center px-4">
      
      {/* ❄️ Snowflakes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {snowflakes.map((i) => (
          <span
            key={i}
            className="snowflake absolute text-white opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${8 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          >
            ❄
          </span>
        ))}
      </div>

      <style>{`
        .snowflake {
          top: -10%;
          font-size: 14px;
          animation: snowfall linear infinite;
        }

        @keyframes snowfall {
          to {
            transform: translateY(120vh) rotate(360deg);
          }
        }
      `}</style>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-8 space-y-5 shadow-2xl"
      >
        {/* Header */}
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Manual Activity Entry
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Add raw activity data for emission calculation
          </p>
        </div>

        {/* Category */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Activity Category
          </label>
          <Dropdown
            options={CATEGORIES}
            value={form.category}
            width="w-full"
            placeholder="Select category"
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                category: value,
                value: "",
                unit: "",
              }))
            }
          />
        </div>

        {/* Value */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Consumption Value
          </label>
          <input
            type="number"
            name="value"
            min={0}
            value={form.value}
            onChange={handleChange}
            placeholder="e.g. 1200"
            className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm outline-none focus:bg-white"
          />
        </div>

        {/* Unit */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Unit</label>
          <Dropdown
            options={UNITS_BY_CATEGORY[form.category] || []}
            value={form.unit}
            width="w-full"
            placeholder={
              form.category ? "Select unit" : "Select category first"
            }
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                unit: value,
              }))
            }
          />
        </div>

        {/* Date */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Activity Date
          </label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full rounded-lg bg-gray-100 px-3 py-2 text-sm outline-none focus:bg-white"
          />
        </div>

        {/* Department */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">
            Department
          </label>
          <Dropdown
            options={DEPARTMENTS}
            value={form.department}
            width="w-full"
            placeholder="Select department"
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                department: value,
              }))
            }
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || loading}
          className="w-full rounded-lg bg-[#26D971] py-3 text-sm font-semibold text-black hover:opacity-90 disabled:opacity-50 transition"
        >
          {loading ? "Saving..." : "Save Activity"}
        </button>
      </form>
    </div>
  );
};

export default AddActivity;
