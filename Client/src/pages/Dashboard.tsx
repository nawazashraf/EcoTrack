import { useEffect, useState } from "react";

import KpiCard from "@/components/kpi/KpiCard";

import { getOverview } from "@/api/getOverview.api";
import { getTrends } from "@/api/getTrends.api";
import { getPerformanceComparison } from "@/api/getPerformanceComparison.api";
import { getRecommendation } from "@/api/getRecommendations.api";

import EmissionTrendsChart from "@/components/charts/EmissionTrendsChart";
import GHGScopeDonutChart from "@/components/charts/GHGScopeDonutChart";

import type { AnalyticsOverview } from "@/types/analytics";

const Dashboard = () => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [trends, setTrends] = useState<any[]>([]);
  const [comparison, setComparison] = useState<any>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          overviewData,
          trendsData,
          comparisonData,
          recommendationData,
        ] = await Promise.all([
          getOverview(),
          getTrends(),
          getPerformanceComparison(),
          getRecommendation(),
        ]);

        setOverview(overviewData);
        setTrends(trendsData);
        setComparison(comparisonData);
        setRecommendations(recommendationData);
      } catch (err) {
        console.error("Dashboard load failed", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) {
    return <p className="text-sm text-gray-500">Loading dashboard…</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Carbon Footprint Dashboard
        </h1>
        <p className="text-sm text-gray-600">
          Overview of your organization’s emissions
        </p>
      </div>

      {/* ================= KPI ROW ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Emissions"
          value={`${overview?.totalEmissions} kgCO2e`}
        />

        {comparison && (
          <KpiCard
            title="This Month"
            value={`${comparison.currentPeriod.totalCO2e} kg`}
            subtitle={comparison.currentPeriod.label}
          />
        )}

        {comparison && (
          <KpiCard
            title="Last Month"
            value={`${comparison.previousPeriod.totalCO2e} kg`}
            subtitle={comparison.previousPeriod.label}
          />
        )}

        {comparison && (
          <KpiCard
            title="Change"
            value={`${comparison.change.percentage}%`}
            subtitle={comparison.change.trend}
            trend={comparison.change.trend}
          />
        )}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Monthly Emission Trend */}
        <EmissionTrendsChart data={trends} />

        {/* GHG Scope Donut (UNCHANGED CHART) */}
        {overview && (
          <GHGScopeDonutChart overview={overview} />
        )}
      </div>

      {/* ================= RECOMMENDATIONS ================= */}
      <div className="bg-white rounded-xl shadow p-5">
        <h2 className="text-lg font-semibold mb-3">
          Key Recommendations
        </h2>

        <div className="space-y-3">
          {recommendations.map((rec, idx) => (
            <div
              key={idx}
              className="border rounded-lg p-3 flex justify-between items-start"
            >
              <div>
                <p className="font-medium capitalize">
                  {rec.category}
                </p>
                <p className="text-sm text-gray-600">
                  {rec.suggestion}
                </p>
              </div>

              <span
                className={`text-xs px-2 py-1 rounded ${
                  rec.impact === "Critical"
                    ? "bg-red-100 text-red-700"
                    : rec.impact === "High"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {rec.impact}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
