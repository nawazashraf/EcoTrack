import { useEffect, useState } from "react";

import KpiCard from "@/components/kpi/KpiCard";

import { getOverview } from "@/api/getOverview.api";
import { getTrends } from "@/api/getTrends.api";
import { getPerformanceComparison } from "@/api/getPerformanceComparison.api";
import { getRecommendation } from "@/api/getRecommendations.api";

import EmissionTrendsChart from "@/components/charts/EmissionTrendsChart";
import GHGScopeDonutChart from "@/components/charts/GHGScopeDonutChart";

import type { AnalyticsOverview } from "@/types/analytics";
import { kgToTon } from "@/utils/formatEmissions";

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
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-gray-500">Loading analytics…</p>
      </div>
    );
  }

  return (
    /*  SCROLLABLE DASHBOARD ONLY */
    <div className="h-full overflow-y-auto bg-[#EDF8FC]">
      <div className="max-w-7xl mx-auto px-8 py-8 space-y-10">

        {/* ================= HEADER ================= */}
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-gray-900">
            Carbon Footprint Overview
          </h1>
          <p className="text-sm text-gray-500">
            Emissions performance and reduction insights (tCO₂e)
          </p>
        </div>

        {/* ================= KPI ================= */}
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            Key Metrics
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiCard
              title="Total Emissions"
              value={`${kgToTon(overview?.totalEmissions)} tCO₂e`}
              subtitle="Cumulative footprint"
            />

            {comparison && (
              <KpiCard
                title="Current Period"
                value={`${kgToTon(comparison.currentPeriod.totalCO2e)} t`}
                subtitle={comparison.currentPeriod.label}
              />
            )}

            {comparison && (
              <KpiCard
                title="Previous Period"
                value={`${kgToTon(comparison.previousPeriod.totalCO2e)} t`}
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
        </section>

        {/* ================= CHARTS ================= */}
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            Emissions Analytics
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl p-6">
              <EmissionTrendsChart data={trends} />
            </div>

            {overview && (
              <div className="rounded-2xl p-6">
                <GHGScopeDonutChart overview={overview} />
              </div>
            )}
          </div>
        </section>

        {/* ================= RECOMMENDATIONS ================= */}
        <section className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-600">
            Strategic Recommendations
          </p>

          <div className="bg-white rounded-2xl border shadow-sm p-6 space-y-5">
            {recommendations.map((rec, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between gap-6 border-b last:border-b-0 pb-4 last:pb-0"
              >
                <div>
                  <p className="font-medium text-gray-900 capitalize">
                    {rec.category}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {rec.suggestion}
                  </p>
                </div>

                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${
                    rec.impact === "Critical"
                      ? "bg-red-100 text-red-700"
                      : rec.impact === "High"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  {rec.impact}
                </span>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
