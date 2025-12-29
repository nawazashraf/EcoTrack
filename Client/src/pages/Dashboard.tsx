import { getOverview } from "@/api/getOverview.api";
import KpiCards from "@/components/KPICards";
import { useEffect, useState } from "react";
import type { AnalyticsOverview } from "@/types/analytics";

const Dashboard = () => {
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        setLoading(true);
        const res = await getOverview();
        setOverview(res);
      } catch (err) {
        console.error("Failed to fetch overview", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 animate-pulse">
          Loading sustainability insights…
        </p>
      </div>
    );

  if (!overview)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-400">No data available</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Carbon Footprint Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of your organization’s emissions
          </p>
        </div>

        {/* KPI Cards */}
        <KpiCards  />
      </div>
    </div>
  );
};

export default Dashboard;
