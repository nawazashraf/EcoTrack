// import KpiCard from "@/components/ui/KpiCard";

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
  if (!data.length) return null;

  const total = data.reduce((sum, d) => sum + d.totalCO2e, 0);
  const avg = total / data.length;

  const latest = data[data.length - 1];
  const previous = data[data.length - 2];

  const momChange =
    previous
      ? ((latest.totalCO2e - previous.totalCO2e) / previous.totalCO2e) * 100
      : null;

  const peak = data.reduce((max, d) =>
    d.totalCO2e > max.totalCO2e ? d : max
  );

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
        value={`${peak.totalCO2e.toFixed(1)} kg`}
        subtitle={`${monthNames[peak.month - 1]} ${peak.year}`}
      />

    </div>
  );
};

export default EmissionTrendKPIs;
