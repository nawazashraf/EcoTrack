import type { EmissionBySourceData } from "@/types/emissions";

const EmissionsBySourceInsight = ({ data }: { data: EmissionBySourceData[] }) => {
  const top = [...data].sort((a, b) => b.totalCO2e - a.totalCO2e)[0];

  return (
    <div className="bg-white rounded-xl border shadow-sm p-6 space-y-2">
      <h3 className="text-lg font-semibold">Insights</h3>
      <p className="text-sm text-gray-600">
        🔥 <strong>{top.category}</strong> contributes{" "}
        <strong>{top.percentage}%</strong> of total emissions.
      </p>
      <p className="text-sm text-gray-600">
        📉 Targeting this source will yield the highest reduction impact.
      </p>
    </div>
  );
};

export default EmissionsBySourceInsight;
