export type PerformanceComparison = {
  currentPeriod: {
    label: string;
    totalCO2e: string;
  };
  previousPeriod: {
    label: string;
    totalCO2e: string;
  };
  change: {
    absolute: string;
    percentage: string;
    trend: "Increase" | "Decrease";
  };
};
