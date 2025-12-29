import { useEffect, useState } from "react";
import { getTrends } from "@/api/getTrends.api";
import EmissionTrendsChart from "@/components/charts/EmissionTrendsChart";

const EmissionTrends = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await getTrends();
        setData(res);
      } catch (err) {
        console.error("Failed to load trends", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) return <p>Loading trends...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <EmissionTrendsChart data={data} />
    </div>
  );
};

export default EmissionTrends;
