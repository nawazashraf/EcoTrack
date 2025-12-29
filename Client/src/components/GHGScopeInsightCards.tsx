import type { AnalyticsOverview } from "@/types/analytics";

const GHGScopeInsightCards = ({ overview }: { overview: AnalyticsOverview }) => {
  const total = Number(overview.totalEmissions);

  const topScope = overview.breakdown.reduce((max, curr) =>
    curr.totalCO2e > max.totalCO2e ? curr : max
  );

  const percentage = ((topScope.totalCO2e / total) * 100).toFixed(1);

  const priority =
    topScope._id === "Scope 2"
      ? "Optimize electricity consumption"
      : topScope._id === "Scope 1"
      ? "Reduce direct fuel usage"
      : "Engage suppliers and logistics partners";

  return (
    <div className="space-y-4">
      
      {/* Dominant Scope */}
      <div className="bg-gray-50 rounded-xl p-4 border">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Dominant Scope
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mt-1">
          {topScope._id}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Highest emission contributor
        </p>
      </div>

      {/* Emission Share */}
      <div className="bg-gray-50 rounded-xl p-4 border">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Emission Share
        </p>
        <h3 className="text-xl font-semibold text-gray-900 mt-1">
          {percentage}%
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Of total emissions
        </p>
      </div>

      {/* Action Priority */}
      <div className="bg-gray-50 rounded-xl p-4 border">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Action Priority
        </p>
        <h3 className="text-base font-semibold text-gray-900 mt-1">
          {priority}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Recommended focus area
        </p>
      </div>

    </div>
  );
};

export default GHGScopeInsightCards;
