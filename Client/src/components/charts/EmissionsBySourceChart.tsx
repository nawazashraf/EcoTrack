import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import type { EmissionBySource } from "@/types/emissions";

const COLORS = ["#2563EB", "#DC2626", "#F59E0B", "#16A34A", "#9333EA"];

const EmissionsBySourceChart = ({
  data,
}: {
  data: EmissionBySource[];
}) => {
  const totalCO2e = data.reduce((s, d) => s + d.totalCO2e, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 h-full flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Emissions by Source
        </h2>
        <p className="text-sm text-gray-500">
          Percentage contribution to total emissions
        </p>
      </div>

      {/* Chart */}
      <div className="relative flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="percentage"
              nameKey="category"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<StaticTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center KPI */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-500">Total Emissions</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalCO2e.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">kg CO₂e</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((item, i) => (
          <div key={item.category} className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-gray-700">{item.category}</span>
            </div>
            <span className="font-medium text-gray-900">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmissionsBySourceChart;

const StaticTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const { category, totalCO2e, percentage } = payload[0].payload;

  return (
    <div className="rounded-md bg-white border shadow px-3 py-2">
      <p className="font-semibold text-sm">{category}</p>
      <p className="text-xs text-gray-500">
        {totalCO2e.toLocaleString()} kg CO₂e
      </p>
      <p className="text-xs text-gray-700">{percentage}%</p>
    </div>
  );
};
