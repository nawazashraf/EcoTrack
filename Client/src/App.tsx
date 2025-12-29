import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import LogIn from "./pages/LogIn";
import Onboarding from "./pages/Onboarding";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import EmissionBySource from "./pages/EmissionBySource";
import EmissionTrends from "./pages/EmissionTrends";
import ScopeAnalysis from "./pages/ScopeAnalysis";
import PerformanceComparison from "./pages/PerformanceComparison";
import ForecastAndRisk from "./pages/ForecastAndRisk";
import AddActivity from "./pages/AddActivity";
import UploadActivity from "./pages/UploadActivity";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "login",
          element: <LogIn />,
        },
        {
          path: "onboarding",
          element: <Onboarding/>
        }
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "emission-by-source",
          element: <EmissionBySource />
        },
        {
          path: "emission-trends",
          element: <EmissionTrends />
        },
        {
          path: "scope-analysis",
          element: <ScopeAnalysis />
        },
        {
          path: "performance-comparison",
          element: <PerformanceComparison />
        },
        {
          path: "forecast-and-risk",
          element: <ForecastAndRisk />
        },
        {
          path: "add-activity",
          element: <AddActivity />
        },
        {
          path: "upload-activity",
          element: <UploadActivity />
        },
      ],
    },
  ]);
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
