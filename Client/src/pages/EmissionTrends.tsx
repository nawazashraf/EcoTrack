import { useEffect, useState } from "react";
import { getTrends } from "@/api/getTrends.api";

import EmissionTrendsChart from "@/components/charts/EmissionTrendsChart";
import EmissionTrendKPIs from "@/components/kpi/EmissionTrendKPIs";
import EmissionTrendInsights from "@/components/insights/EmissionTrendInsights";
// import EmissionTrendKPIs from "@/components/analytics/EmissionTrendKPIs";
// import EmissionTrendInsights from "@/components/analytics/EmissionTrendInsights";

type TrendItem = {
  year: number;
  month: number;
  totalCO2e: number;
};

const EmissionTrends = () => {
  const [data, setData] = useState<TrendItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        const res = await getTrends();
        setData(res.data ?? res);
      } catch (err) {
        console.error("Failed to load emission trends", err);
        setError("Unable to load emission trends");
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-sm text-gray-500">
        Loading emission trends...
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-sm text-red-500">{error}</div>;
  }

  if (!data.length) {
    return (
      <div className="p-6 text-sm text-gray-400">
        No emission trend data available.
      </div>
    );
  }

  return (
    <div className="min-h-screen  w-full bg-[#EDF8FC]">
      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Emission Trends
          </h1>
          <p className="text-sm text-gray-500">
            Monthly CO₂e emissions overview and insights
          </p>
        </div>

        {/* KPI Cards */}
        <EmissionTrendKPIs data={data} />

        {/* Chart + Insights Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart (Left – Wider) */}
          <div className="lg:col-span-2">
            <EmissionTrendsChart data={data} />
          </div>

          {/* Insights (Right) */}
          <div className="lg:col-span-1">
            <EmissionTrendInsights data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmissionTrends;
