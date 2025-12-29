import type { AnalyticsOverview } from "@/types/analytics";

const GHGScopeInsight = ({ overview }: { overview: AnalyticsOverview }) => {
  const total = Number(overview.totalEmissions);

  {/* finding highest scope by emission */}
  const topScope = overview.breakdown.reduce((max, curr) =>
    curr.totalCO2e > max.totalCO2e ? curr : max
  );

  const percentage = ((topScope.totalCO2e / total) * 100).toFixed(1);

  {/* Mapping scope with insights */}
  const reason =
    topScope._id === "Scope 2"
      ? "electricity consumption"
      : topScope._id === "Scope 1"
      ? "direct fuel usage"
      : "indirect operational activities";

  return (
    <p className="text-gray-600 text-sm mt-4">
      <strong>{topScope._id}</strong> accounts for{" "}
      <strong>{percentage}%</strong> of total emissions, mainly driven by{" "}
      <strong>{reason}</strong>.
    </p>
  );
};

export default GHGScopeInsight;
