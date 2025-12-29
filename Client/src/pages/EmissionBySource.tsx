import { useEffect, useState } from "react";
import { getEmissionsBySource } from "@/api/getEmissionsBySource.api";
import EmissionsBySourceChart from "@/components/EmissionsBySourceChart";
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

  if (loading) return <p>Loading emissions data...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Emissions by Source
      </h1>

      <EmissionsBySourceChart data={data} />
      <EmissionsBySourceInsight data={data} />
    </div>
  );
};

export default EmissionBySource;
