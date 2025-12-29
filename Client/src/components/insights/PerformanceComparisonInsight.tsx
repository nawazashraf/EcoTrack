import type { PerformanceComparison } from "@/types/comparison";

const PerformanceComparisonInsight = ({
  data,
}: {
  data: PerformanceComparison;
}) => {
  const isDecrease = data.change.trend === "Decrease";

  return (
    <div className="space-y-4">
      
      {/* Overall Trend */}
      <div className="bg-gray-50 border rounded-xl p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Overall Trend
        </p>
        <p
          className={`text-lg font-semibold mt-1 ${
            isDecrease ? "text-green-600" : "text-red-600"
          }`}
        >
          {isDecrease ? "Improving" : "Worsening"}
        </p>
      </div>

      {/* Percentage Change */}
      <div className="bg-gray-50 border rounded-xl p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Percentage Change
        </p>
        <p
          className={`text-lg font-semibold mt-1 ${
            isDecrease ? "text-green-600" : "text-red-600"
          }`}
        >
          {isDecrease ? "↓" : "↑"} {data.change.percentage}%
        </p>
      </div>

      {/* Interpretation */}
      <div className="bg-gray-50 border rounded-xl p-4">
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          Interpretation
        </p>
        <p className="text-sm text-gray-700 mt-1 leading-relaxed">
          {isDecrease
            ? "Emissions reduced compared to the previous period, indicating improved sustainability performance."
            : "Emissions increased compared to the previous period, suggesting higher operational impact."}
        </p>
      </div>

    </div>
  );
};

export default PerformanceComparisonInsight;
