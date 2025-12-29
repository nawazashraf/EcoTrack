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
  unit: string;
  safeLimit: number;
};

const ForecastVsLimitChart = ({ forecastValue, unit, safeLimit }: Props) => {
  const data = [
    { name: "Forecast", value: forecastValue },
    { name: "Safe Limit", value: safeLimit },
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5 h-full">
      <h3 className="text-md font-semibold mb-3">
        Forecast vs Safe Limit ({unit})
      </h3>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={30}>
            <XAxis dataKey="name" />
            <YAxis />
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
