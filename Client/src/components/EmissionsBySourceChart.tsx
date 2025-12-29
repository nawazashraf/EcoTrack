import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import type { EmissionBySource } from "@/types/emissions";

type Props = {
  data: EmissionBySource[];
};

const EmissionsBySourceChart = ({ data }: Props) => {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-lg font-semibold mb-4">
        Emissions by Source
      </h2>

      <ResponsiveContainer width="100%" height={360}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => `${value.toLocaleString()} kg CO₂e`}
          />
          <Bar
            dataKey="totalCO2e"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmissionsBySourceChart;
