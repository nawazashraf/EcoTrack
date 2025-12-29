import type { DropdownOption } from "@/types/activity.types";

export const CATEGORIES: DropdownOption[] = [
  { value: "electricity", label: "Electricity" },
  { value: "transportation", label: "Transportation" },
  { value: "waste", label: "Waste" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "fuel", label: "Fuel" },

];

export const DEPARTMENTS: DropdownOption[] = [
  { value: "operations", label: "Operations" },
  { value: "engineering", label: "Engineering" },
  { value: "logistics", label: "Logistics" },
  { value: "admin", label: "Admin" },
];

export const UNITS_BY_CATEGORY: Record<string, DropdownOption[]> = {
  electricity: [{ value: "kWh", label: "kWh" }],
  fuel: [
    { value: "liters", label: "Liters" },
    { value: "kg", label: "Kilograms" },
    { value: "m3", label: "Cubic meters" }, // for CNG / Natural Gas
  ],
  transport: [
    { value: "km", label: "Kilometers" },
    { value: "liters", label: "Liters" },
  ],
  waste: [{ value: "kg", label: "Kilograms" }],
  manufacturing: [
    { value: "kg", label: "Kilograms" },
    { value: "units", label: "Units" },
  ],
};
