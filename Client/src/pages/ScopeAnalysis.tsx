import { useEffect, useState } from "react";
import { getOverview } from "@/api/getOverview.api";
import type { AnalyticsOverview } from "@/types/analytics";
import GHGScopeDonutChart from "@/components/GHGScopeDonutChart";
import GHGScopeInsight from "@/components/insights/GHGScopeInsight";


const GHGScopeAnalysis = () => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getOverview();
        setOverview(res);
      } catch (err) {
        console.error("Failed to load GHG scope data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading GHG scope analysis...</p>;
  if (!overview) return <p>No data available</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        GHG Scope Analysis
      </h1>

      <GHGScopeDonutChart overview={overview} />
      <GHGScopeInsight overview={overview} />
    </div>
  );
};

export default GHGScopeAnalysis;
