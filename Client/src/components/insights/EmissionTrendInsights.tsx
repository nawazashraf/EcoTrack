type TrendItem = {
  year: number;
  month: number;
  totalCO2e: number;
};

const EmissionTrendInsights = ({ data }: { data: TrendItem[] }) => {
  if (data.length < 2) return null;

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  const change =
    ((latest.totalCO2e - previous.totalCO2e) / previous.totalCO2e) * 100;

  const improving = change < 0;

  return (
    <div className="border border-gray-100 rounded-lg p-4 mt-6 bg-white">
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Insights
      </h3>

      <ul className="space-y-1 text-sm text-gray-600">
        <li>
          {improving
            ? `📉 Emissions decreased by ${Math.abs(change).toFixed(1)}% compared to last month.`
            : `📈 Emissions increased by ${change.toFixed(1)}% compared to last month.`}
        </li>
        <li>
          📊 Tracking monthly trends helps identify efficiency improvements and risk periods.
        </li>
        <li>
          🎯 Sustained reductions directly support long-term sustainability goals.
        </li>
      </ul>
    </div>
  );
};

export default EmissionTrendInsights;
