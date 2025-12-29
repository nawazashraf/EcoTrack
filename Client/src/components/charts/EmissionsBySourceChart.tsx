import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { EmissionBySource } from "@/types/emissions";

const COLORS = ["#2563EB", "#DC2626", "#F59E0B", "#16A34A", "#9333EA"];

const EmissionsBySourceChart = ({ data }: { data: EmissionBySource[] }) => {
  if (!data?.length) return null;

  const totalCO2e = data.reduce((s, d) => s + d.totalCO2e, 0);

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 w-full">

      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Emissions by Source
        </h2>
        <p className="text-sm text-gray-500">
          Percentage contribution to total emissions
        </p>
      </div>

      <div className="relative w-full  h-[300px] sm:h-[340px] lg:h-[250px]">
        <ResponsiveContainer width="100%" height={"100%"}>
          <PieChart>
            <Pie
              data={data}
              dataKey="totalCO2e" 
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={2}
              isAnimationActive={false}
            >
              {data.map((_, i) => (
                <Cell
                  key={i}
                  fill={COLORS[i % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number, _n, props) => {
                const pct = props.payload.percentage;
                return [
                  `${value.toLocaleString()} kg (${pct}%)`,
                  "Emissions",
                ];
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-500">Total Emissions</p>
          <p className="text-2xl font-bold text-gray-900">
            {totalCO2e.toLocaleString()}
          </p>
          <p className="text-xs text-gray-400">kg CO₂e</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        {data.map((item, i) => (
          <div
            key={item.category}
            className="flex items-center justify-between text-sm"
          >
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
