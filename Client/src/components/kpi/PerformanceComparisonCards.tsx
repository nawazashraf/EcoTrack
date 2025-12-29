import type { PerformanceComparison } from "@/types/comparison";

const PerformanceComparisonCards = ({ data }: { data: PerformanceComparison }) => {
  const isDecrease = data.change.trend === "Decrease";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Current Period</p>
        <h3 className="text-xl font-semibold">
          {data.currentPeriod.totalCO2e} kg CO₂e
        </h3>
        <p className="text-sm text-gray-400">{data.currentPeriod.label}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Previous Period</p>
        <h3 className="text-xl font-semibold">
          {data.previousPeriod.totalCO2e} kg CO₂e
        </h3>
        <p className="text-sm text-gray-400">{data.previousPeriod.label}</p>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Change</p>
        <h3
          className={`text-xl font-semibold ${
            isDecrease ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.change.absolute} kg CO₂e
        </h3>
      </div>

      <div className="bg-white rounded-xl shadow p-4">
        <p className="text-xs text-gray-500">Trend</p>
        <h3
          className={`text-xl font-semibold ${
            isDecrease ? "text-green-600" : "text-red-600"
          }`}
        >
          {isDecrease ? "↓" : "↑"} {data.change.percentage}%
        </h3>
      </div>

    </div>
  );
};

export default PerformanceComparisonCards;
