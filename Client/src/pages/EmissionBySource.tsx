import { useEffect, useState } from "react";
import { getEmissionsBySource } from "@/api/getEmissionsBySource.api";
import EmissionsBySourceChart from "@/components/charts/EmissionsBySourceChart";
import EmissionsBySourceKpis from "@/components/kpi/EmissionsBySourceKpis";
import EmissionsBySourceInsight from "@/components/insights/EmissionsBySourceInsight";
import type { EmissionBySource } from "@/types/emissions";

const EmissionBySource = () => {
  const [data, setData] = useState<EmissionBySource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getEmissionsBySource();
        setData(res);
      } catch (err) {
        console.error("Failed to load emissions by source", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading emissions data...</p>;
  }

  return (
    <div className="w-full bg-[#EDF8FC]">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        <h1 className="text-2xl font-bold">Emissions by Source</h1>

        {/* CHART + KPI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch h-[440px]">
          <div className="lg:col-span-2 h-full">
            <EmissionsBySourceChart data={data} />
          </div>

          <div className="lg:col-span-1 h-full">
            <EmissionsBySourceKpis data={data} />
          </div>
        </div>

        {/* INSIGHTS */}
        <EmissionsBySourceInsight data={data} />
      </div>
    </div>
  );
};

export default EmissionBySource;
