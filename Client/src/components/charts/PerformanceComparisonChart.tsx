import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import type { PerformanceComparison } from "@/types/comparison";

const PerformanceComparisonChart = ({ data }: { data: PerformanceComparison }) => {
  const chartData = [
    {
      period: data.previousPeriod.label,
      emissions: Number(data.previousPeriod.totalCO2e)
    },
    {
      period: data.currentPeriod.label,
      emissions: Number(data.currentPeriod.totalCO2e)
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Emissions Comparison
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="emissions" fill="#3b82f6" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceComparisonChart;
