import { createBrowserRouter, RouterProvider } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import MainLayout from "./layout/MainLayout";

import LogIn from "./pages/LogIn";
import Onboarding from "./pages/Onboarding";

import Dashboard from "./pages/Dashboard";
import EmissionBySource from "./pages/EmissionBySource";
import EmissionTrends from "./pages/EmissionTrends";
import ScopeAnalysis from "./pages/ScopeAnalysis";
import PerformanceComparison from "./pages/PerformanceComparison";
import ForecastAndRisk from "./pages/ForecastAndRisk";
import AddActivity from "./pages/AddActivity";
import UploadActivity from "./pages/UploadActivity";

import PublicOnlyRoute from "./components/PublicOnlyRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import OnboardingGuard from "./components/OnboardingGuard";

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/login",
          element: (
            <PublicOnlyRoute>
              <LogIn />
            </PublicOnlyRoute>
          ),
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          ),
        },
      ],
    },
    {
      element: (
        <ProtectedRoute>
          <OnboardingGuard>
            <MainLayout />
          </OnboardingGuard>
        </ProtectedRoute>
      ),
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/emission-by-source", element: <EmissionBySource /> },
        { path: "/emission-trends", element: <EmissionTrends /> },
        { path: "/scope-analysis", element: <ScopeAnalysis /> },
        { path: "/performance-comparison", element: <PerformanceComparison /> },
        { path: "/forecast-and-risk", element: <ForecastAndRisk /> },
        { path: "/add-activity", element: <AddActivity /> },
        { path: "/upload-activity", element: <UploadActivity /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
