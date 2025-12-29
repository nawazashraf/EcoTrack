import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type Props = {
  category: string;
  impact: "Low" | "High" | "Critical";
  suggestion: string;
};

const RiskDominanceChart = ({ category, impact, suggestion }: Props) => {
  const riskScore =
    impact === "Critical" ? 80 : impact === "High" ? 60 : 30;

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
    <div className="bg-white rounded-xl shadow p-5 h-full">
      <h3 className="text-md font-semibold mb-3">Risk Dominance</h3>

      <div className="flex flex-col items-center">
        <div className="h-56 w-56">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={90}
              >
                <Cell fill={color} />
                <Cell fill="#E5E7EB" />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <p className="mt-2 text-sm font-semibold capitalize">{category}</p>

        <span
          className={`mt-1 px-3 py-1 text-xs rounded-full ${
            impact === "Critical"
              ? "bg-red-100 text-red-700"
              : impact === "High"
              ? "bg-orange-100 text-orange-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {impact} Impact
        </span>

        <p className="mt-3 text-sm text-gray-600 text-center">
          {suggestion}
        </p>
      </div>
    </div>
  );
};

export default RiskDominanceChart;
