import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TrendItem = {
  year: number;
  month: number;
  totalCO2e: number;
};

type Props = {
  data: TrendItem[];
};

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EmissionTrendsChart = ({ data }: Props) => {
  const chartData = data.map((item) => ({
    month: `${monthNames[item.month - 1]} ${item.year}`,
    emissions: Number(item.totalCO2e.toFixed(2)),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Monthly Emission Trends
      </h2>

      {/* Height adapts by screen size */}
      <div className="w-full h-65 sm:h-75 md:h-85">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="month"
              interval="preserveStartEnd"
              tick={{
                fontSize: 11,
              }}
              angle={-30}
              textAnchor="end"
              height={60}
            />

            <YAxis
              tick={{ fontSize: 11 }}
              width={40}
            />

            <Tooltip
              formatter={(value: number) => [`${value} kg CO₂e`, "Emissions"]}
              labelStyle={{ fontSize: 12 }}
              contentStyle={{ fontSize: 12 }}
            />

            <Line
              type="monotone"
              dataKey="emissions"
              stroke="#22c55e"
              strokeWidth={2.5}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionTrendsChart;
