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
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 h-80 flex items-center justify-center text-gray-400 border border-gray-100">
        No Trend Data Available
      </div>
    );
  }

  const chartData = safeData.map((item) => ({
    month: `${monthNames[(item.month - 1) % 12]} ${item.year}`, 
    emissions: Number((item.totalCO2e || 0).toFixed(2)),
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
        Monthly Emission Trends
      </h2>

      {/* Height adapts by screen size */}
      <div className="w-full h-65 sm:h-75 md:h-85">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />

            <XAxis
              dataKey="month"
              interval="preserveStartEnd"
              tick={{ fontSize: 11, fill: "#6b7280" }}
              angle={-30}
              textAnchor="end"
              height={60}
              tickLine={false}
              axisLine={false}
            />

            <YAxis 
              tick={{ fontSize: 11, fill: "#6b7280" }} 
              width={40} 
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{ 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                border: "1px solid #e5e7eb",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
              formatter={(value) => {
                if (value === undefined) return ["–", "Emissions"];
                return [`${value} kg CO₂e`, "Emissions"];
              }}
              labelStyle={{ fontSize: 12, fontWeight: 600, color: "#374151" }}
            />

            <Line
              type="monotone"
              dataKey="emissions"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4, fill: "#22c55e", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6, fill: "#22c55e" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EmissionTrendsChart;