
import { getPrediction } from "@/api/getPredictions.api";
import { getRecommendation } from "@/api/getRecommendations.api";
import { useEffect, useState } from "react";
import ForecastVsLimitChart from "@/components/charts/ForecastVsLimitChart";
import RiskDominanceChart from "@/components/charts/RiskDominanceChart";

type ForecastResponse = {
  predictionForNextMonth: {
    value: number;
    unit: "kgCO2e" | "tCO2e";
  };
  basedOn: string;
  trend: "Increasing" | "Decreasing" | "Stable" | "Unknown";
  confidence: string;
  suggestion: string;
};

type Recommendation = {
  category: string;
  impact: "Low" | "High" | "Critical";
  suggestion: string;
};

// 🔒 SINGLE SOURCE OF TRUTH (TONS)
const SAFE_LIMIT_TON = 5;

const ForecastAndRisk = () => {
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [forecastRes, recommendationRes] = await Promise.all([
          getPrediction(),
          getRecommendation(),
        ]);

        setForecast(forecastRes);
        setRecommendations(recommendationRes);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-sm text-gray-500">Loading…</p>;
  if (!forecast) return <p className="text-red-500">Failed to load data</p>;

  const primaryRisk = recommendations[0];

  const safeLimit =
    forecast.predictionForNextMonth.unit === "kgCO2e"
      ? SAFE_LIMIT_TON * 1000
      : SAFE_LIMIT_TON;

  return (
    <div className="min-h-screen w-full bg-[#EDF8FC]">
      <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Forecast & Risk Analysis
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Predict future emissions and identify key risk drivers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Risk Dominance */}
          {primaryRisk && (
            <div className="bg-white rounded-xl shadow p-4 h-[360px] sm:h-[420px] lg:h-[520px]">
              <RiskDominanceChart
                category={primaryRisk.category}
                impact={primaryRisk.impact}
                suggestion={primaryRisk.suggestion}
              />
            </div>
          )}

          {/* Forecast Section */}
          <div className="flex flex-col gap-6">

            {/* Forecast Summary */}
            <div className="bg-white rounded-xl shadow p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-semibold text-gray-800">
                    Emissions Forecast
                  </h2>
                  <p className="text-xs text-gray-500">
                    Next reporting period estimate
                  </p>
                </div>

                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    forecast.trend === "Increasing"
                      ? "bg-red-100 text-red-700"
                      : forecast.trend === "Decreasing"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {forecast.trend}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-3">
                <div>
                  <p className="text-xs text-gray-500">Forecast</p>
                  <p className="text-xl font-bold">
                    {forecast.predictionForNextMonth.value}
                    <span className="text-sm text-gray-500 ml-1">
                      {forecast.predictionForNextMonth.unit}
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Confidence</p>
                  <p className="text-sm font-medium">
                    {forecast.confidence}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Primary Risk</p>
                  <p className="text-sm font-medium capitalize">
                    {primaryRisk?.category ?? "—"}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-xs text-red-600 font-medium">
                ⚠ {forecast.suggestion}
              </p>
            </div>

            {/* Forecast vs Limit */}
            <div className="bg-white rounded-xl shadow p-4 h-[220px] sm:h-[290px] lg:h-[350px]">
              <ForecastVsLimitChart
                forecastValue={forecast.predictionForNextMonth.value}
                unit={forecast.predictionForNextMonth.unit}
                safeLimit={safeLimit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastAndRisk;
