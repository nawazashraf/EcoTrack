import { useEffect, useState } from "react";
import { getPerformanceComparison } from "@/api/getPerformanceComparison.api";
import type { PerformanceComparison } from "@/types/comparison";

import PerformanceComparisonCards from "@/components/kpi/PerformanceComparisonCards";
import PerformanceComparisonChart from "@/components/charts/PerformanceComparisonChart";
import PerformanceComparisonInsight from "@/components/insights/PerformanceComparisonInsight";

const PerformanceComparisonPage = () => {
  const [data, setData] = useState<PerformanceComparison | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPerformanceComparison();
        setData(res);
      } catch (err) {
        console.error("Failed to load comparison data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <p className="p-6 text-gray-500">Loading comparison...</p>;
  if (!data) return <p className="p-6 text-gray-500">No data available</p>;

  return (
    <div className="w-full bg-[#EDF8FC]">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            Performance Comparison
          </h1>
          <p className="text-sm text-gray-600 max-w-3xl">
            Month-over-month comparison of total greenhouse gas emissions to
            evaluate sustainability performance trends.
          </p>
        </div>

        {/* KPI Cards at TOP */}
        <PerformanceComparisonCards data={data} />

        {/* Chart + Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chart (LEFT) */}
          <div className="lg:col-span-2">
            <PerformanceComparisonChart data={data} />
          </div>

          {/* Insights (RIGHT) */}
          <div className="flex flex-col justify-start">
            <PerformanceComparisonInsight data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceComparisonPage;
