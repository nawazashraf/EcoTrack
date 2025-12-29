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

  console.log(data);
  

  if (loading) {
    return (
      <p className="text-center py-10 text-sm text-gray-500">
        Loading emissions data...
      </p>
    );
  }

  if (!data.length) {
    return (
      <p className="text-center py-10 text-sm text-gray-400">
        No emissions data available
      </p>
    );
  }

  return (
    <div className="min-h-screen  w-full bg-[#EDF8FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">

        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
          Emissions by Source
        </h1>

        {/* CHART + KPI */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Chart (give it space) */}
          <div className="lg:col-span-2">
            <EmissionsBySourceChart data={data} />
          </div>

          {/* KPIs */}
          <div className="lg:col-span-1">
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
