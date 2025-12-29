import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type Props = {
  category: string;
  impact: "Low" | "High" | "Critical";
  suggestion: string;
};

const RiskDominanceChart = ({ category, impact, suggestion }: Props) => {
  const riskScore = impact === "Critical" ? 80 : impact === "High" ? 60 : 30;

  const data = [
    { name: category, value: riskScore },
    { name: "Other Sources", value: 100 - riskScore },
  ];

  const color =
    impact === "Critical"
      ? "#EF4444"
      : impact === "High"
      ? "#F97316"
      : "#22C55E";

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-800 mb-2">
        Risk Dominance
      </h3>

      {/* Chart */}
      <div className="flex-1 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              innerRadius="40%"
              outerRadius="85%"
              paddingAngle={2}
              stroke="#ffffff"
              strokeWidth={2}
            >
              <Cell fill={color} />
              <Cell fill="#CBD5E1" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-gray-900">{riskScore}%</p>
          <p className="text-xs text-gray-500">Risk Share</p>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 text-center">
        <p className="text-sm font-semibold capitalize">{category}</p>

        <span
          className={`inline-block mt-1 px-3 py-1 text-xs rounded-full ${
            impact === "Critical"
              ? "bg-red-100 text-red-700"
              : impact === "High"
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {impact} Impact
        </span>

        <p className="mt-2 text-xs text-gray-600 max-w-xs mx-auto">
          {suggestion}
        </p>
      </div>
    </div>
  );
};

export default RiskDominanceChart;
