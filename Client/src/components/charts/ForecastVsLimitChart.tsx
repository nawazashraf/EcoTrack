
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  forecastValue: number;
  unit: "kgCO2e" | "tCO2e";
  safeLimit: number;
};

const ForecastVsLimitChart = ({ forecastValue, unit, safeLimit }: Props) => {
  const data = [
    { name: "Forecast", value: forecastValue },
    { name: "Safe Limit", value: safeLimit },
  ];

  return (
    <div className="rounded-xl p-3 h-full">
      <h3 className="text-sm font-semibold mb-2 text-gray-800">
        Forecast vs Safe Limit
        <span className="text-xs text-gray-500 ml-1">({unit})</span>
      </h3>

      <div className="w-full h-40 sm:h-45 lg:h-50">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={24}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar
              dataKey="value"
              radius={[6, 6, 0, 0]}
              fill={forecastValue > safeLimit ? "#EF4444" : "#22C55E"}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ForecastVsLimitChart;
