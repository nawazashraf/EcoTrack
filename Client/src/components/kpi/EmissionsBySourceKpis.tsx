import KpiCard from "./KpiCard";

const EmissionsBySourceKpis = ({ data }: { data: any[] }) => {
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-100 p-4 text-center text-gray-500">
        Loading KPIs...
      </div>
    );
  }

  const total = safeData.reduce((sum, d) => sum + (d.totalCO2e || 0), 0);

  const sorted = [...safeData].sort((a, b) => (b.totalCO2e || 0) - (a.totalCO2e || 0));

  const top = sorted[0] || { category: "N/A", percentage: 0 };
  const lowest = sorted[sorted.length - 1] || { category: "N/A", percentage: 0 };

  return (
    <div className="rounded-2xl border border-gray-100 p-3 flex flex-col gap-x-2 gap-y-4">
      <KpiCard
        title="Total Emissions"
        value={`${total.toLocaleString()} kg`}
        subtitle="CO₂e"
      />

      <KpiCard
        title="Top Source"
        value={top.category || "N/A"}
        subtitle={`${top.percentage || 0}%`}
      />

      <KpiCard
        title="Top Contribution"
        value={`${top.percentage || 0}%`}
        subtitle="Highest impact"
      />

      <KpiCard
        title="Lowest Source"
        value={lowest.category || "N/A"}
        subtitle={`${lowest.percentage || 0}%`}
      />
    </div>
  );
};

export default EmissionsBySourceKpis;