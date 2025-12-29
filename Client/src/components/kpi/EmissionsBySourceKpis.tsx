import type { EmissionBySource } from "@/types/emissions";
import KpiCard from "./KpiCard";

const EmissionsBySourceKpis = ({
  data,
}: {
  data: EmissionBySource[];
}) => {
  const total = data.reduce(
    (sum, d) => sum + d.totalCO2e,
    0
  );

  const sorted = [...data].sort(
    (a, b) => b.totalCO2e - a.totalCO2e
  );

  const top = sorted[0];
  const lowest = sorted[sorted.length - 1];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 h-full flex flex-col gap-2">
      <KpiCard
        title="Total Emissions"
        value={`${total.toLocaleString()} kg`}
        subtitle="CO₂e"
      />

      <KpiCard
        title="Top Source"
        value={top.category}
        subtitle={`${top.percentage}%`}
      />

      <KpiCard
        title="Top Contribution"
        value={`${top.percentage}%`}
        subtitle="Highest impact"
      />

      <KpiCard
        title="Lowest Source"
        value={lowest.category}
        subtitle={`${lowest.percentage}%`}
      />
    </div>
  );
};

export default EmissionsBySourceKpis;
