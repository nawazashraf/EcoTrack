import KpiCard from "./KpiCard";

type TrendItem = {
  year: number;
  month: number;
  totalCO2e: number;
};

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const EmissionTrendKPIs = ({ data }: { data: TrendItem[] }) => {
  const safeData = Array.isArray(data) ? data : [];

  if (safeData.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <KpiCard title="Total Emissions" value="-" subtitle="Loading..." />
        <KpiCard title="Avg / Month" value="-" subtitle="Loading..." />
        <KpiCard title="MoM Change" value="-" subtitle="Loading..." />
        <KpiCard title="Peak Month" value="-" subtitle="Loading..." />
      </div>
    );
  }

  const total = safeData.reduce((sum, d) => sum + (d.totalCO2e || 0), 0);
  const avg = total / safeData.length;

  const latest = safeData[safeData.length - 1];
  const previous = safeData[safeData.length - 2];

  const momChange =
    previous && previous.totalCO2e > 0
      ? ((latest.totalCO2e - previous.totalCO2e) / previous.totalCO2e) * 100
      : null;

  const peak = safeData.reduce((max, d) =>
    (d.totalCO2e || 0) > (max.totalCO2e || 0) ? d : max
  , safeData[0]);

  const peakMonthName = monthNames[(peak.month || 1) - 1] || "Unknown";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      
      <KpiCard
        title="Total Emissions"
        value={`${total.toFixed(1)} kg`}
        subtitle="Selected period"
      />

      <KpiCard
        title="Avg / Month"
        value={`${avg.toFixed(1)} kg`}
        subtitle="Monthly average"
      />

      <KpiCard
        title="MoM Change"
        value={
          momChange !== null ? (
            <span
              className={momChange < 0 ? "text-green-600" : "text-red-600"}
            >
              {momChange < 0 ? "↓" : "↑"} {Math.abs(momChange).toFixed(1)}%
            </span>
          ) : (
            "—"
          )
        }
        subtitle="Compared to last month"
      />

      <KpiCard
        title="Peak Month"
        value={`${(peak.totalCO2e || 0).toFixed(1)} kg`}
        subtitle={`${peakMonthName} ${peak.year || ""}`}
      />

    </div>
  );
};

export default EmissionTrendKPIs;