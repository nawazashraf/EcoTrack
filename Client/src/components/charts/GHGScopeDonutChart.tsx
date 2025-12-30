import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const COLORS: Record<string, string> = {
  "Scope 1": "#ef4444",
  "Scope 2": "#f59e0b",
  "Scope 3": "#22c55e",
};

type Props = {
  overview: any; 
};

const GHGScopeDonutChart = ({ overview }: Props) => {
  const breakdown = Array.isArray(overview?.breakdown) ? overview.breakdown : [];
  const total = Number(overview?.totalEmissions || 0);

  if (breakdown.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-center h-80 text-gray-400">
        No Scope Data Available
      </div>
    );
  }

  const data = breakdown.map((item: any) => ({
    name: item._id || "Unknown",
    value: Number((item.totalCO2e || 0).toFixed(2)),
    percentage: total ? Number(((item.totalCO2e / total) * 100).toFixed(1)) : 0,
    color: COLORS[item._id] || "#94a3b8",
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          GHG Scope Distribution
        </h2>
        <p className="text-sm text-gray-500">
          Breakdown of total emissions by scope
        </p>
      </div>

      {/* Chart */}
      <div className="relative h-75">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={75}
              outerRadius={115}
              paddingAngle={3}
            >
              {data.map((item: any, index: number) => (
                <Cell key={index} fill={item.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: any, _name: any, props: any) => {
                if (value === undefined || !props?.payload) {
                  return ["–", ""];
                }
                return [
                  `${Number(value).toLocaleString()} kg CO₂e (${
                    props.payload.percentage ?? 0
                  }%)`,
                  props.payload.name ?? "",
                ];
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-500 uppercase tracking-wide">
            Total Emissions
          </p>
          <p className="text-xl font-semibold text-gray-900">
            {total.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">kg CO₂e</p>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        {data.map((item: any) => (
          <div
            key={item.name}
            className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-gray-700">{item.name}</span>
            </div>
            <span className="text-gray-500">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GHGScopeDonutChart;