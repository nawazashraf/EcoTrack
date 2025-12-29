import { useEffect, useState } from "react";
import { getOverview } from "@/api/getOverview.api";
import type { AnalyticsOverview } from "@/types/analytics";
import GHGScopeDonutChart from "@/components/charts/GHGScopeDonutChart";
import GHGScopeInsightCards from "@/components/GHGScopeInsightCards";
// import GHGScopeInsightCards from "@/components/insights/GHGScopeInsight";
// import GHGScopeInsightCardsfrom "@/components/insights/GHGScopeInsightCards";
// import GHGScopeInsightCards from "@/components/insights/GHGScopeInsightCards";

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

  /* -------------------- States -------------------- */

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">Loading GHG scope analysis…</p>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <p className="text-gray-500">No emission data available.</p>
      </div>
    );
  }

  /* -------------------- Page -------------------- */

  return (
    <div className="min-h-screen w-full bg-[#EDF8FC]">
      <div className="max-w-6xl mx-auto p-6 space-y-10">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold text-gray-900">
            GHG Scope Analysis
          </h1>
          <p className="text-gray-600 text-sm max-w-3xl">
            This analysis categorizes total greenhouse gas emissions into Scope
            1 (direct), Scope 2 (electricity), and Scope 3 (indirect) emissions
            to identify priority areas for emission reduction.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Donut Chart */}
          <div className="lg:col-span-2">
            <GHGScopeDonutChart overview={overview} />
          </div>

          {/* Key Insights */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Key Insights
            </h2>
            <GHGScopeInsightCards overview={overview} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400">
          Emissions are calculated using standardized emission factors and
          classified according to the GHG Protocol.
        </div>
      </div>
    </div>
  );
};

export default GHGScopeAnalysis;
