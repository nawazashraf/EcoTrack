export type ActivityForm = {
  category: string;
  value: number | "";
  unit: string;
  date: string;
  department?: string;
};

export type DropdownOption = {
  value: string;
  label: string;
};
