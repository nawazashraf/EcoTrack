import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import type { AnalyticsOverview } from "@/types/analytics";

const COLORS = {
  "Scope 1": "#ef4444",
  "Scope 2": "#f59e0b",
  "Scope 3": "#22c55e"
};

type Props = {
  overview: AnalyticsOverview;
};

const GHGScopeDonutChart = ({ overview }: Props) => {
  const data = overview.breakdown.map(item => ({
    name: item._id,
    value: Number(item.totalCO2e.toFixed(2)),
    color: COLORS[item._id] || "#94a3b8"
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        GHG Scope Analysis
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
          >
            {data.map((item, index) => (
              <Cell key={index} fill={item.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4 text-sm">
        {data.map(item => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GHGScopeDonutChart;
