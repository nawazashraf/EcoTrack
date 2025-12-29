import Dropdown from "@/components/DropDown";
import { useState } from "react";

import type { ActivityForm } from "@/types/activity.types";
import {
  CATEGORIES,
  DEPARTMENTS,
  UNITS_BY_CATEGORY,
} from "@/constants/activity.constants";

const AddActivity = () => {
  const [form, setForm] = useState<ActivityForm>({
    category: "",
    value: "",
    unit: "",
    date: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "value" ? Number(value) || "" : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //? Handling Activity submission

    console.log("Submitting Activity:", form);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl p-8 space-y-5 shadow-sm">
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
            value={form.department || ""}
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
          onClick={handleSubmit}
          className="w-full rounded-lg bg-[#26D971] py-3 text-sm font-semibold text-black hover:opacity-90"
        >
          Save Activity
        </button>
      </div>
    </div>
  );
};

export default AddActivity;
