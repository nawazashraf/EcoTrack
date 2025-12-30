import { useEffect, useState } from "react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import { Zap, Car, Factory, TrendingUp } from "lucide-react"; 

interface DashboardData {
  totalCO2e: number;
  byCategory: { _id: string; totalCO2e: number }[];
  monthlyTrends: { _id: string; totalCO2e: number }[];
  bySource: { name: string; value: number }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  // Use Render URL
  const API_URL = import.meta.env.VITE_API_URL || "https://ecotrack-backend-vkcx.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch(`${API_URL}/api/analytics/overview`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const result = await res.json();
        
        if (result) {
          setData({
            totalCO2e: result.totalCO2e || 0,
            byCategory: result.byCategory || [],
            monthlyTrends: result.monthlyTrends || [],
            bySource: result.byCategory 
              ? result.byCategory.map((item: any) => ({ name: item._id, value: item.totalCO2e }))
              : []
          });
        }
      } catch (err) {
        console.error("Dashboard Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-[#2A553C] animate-pulse">
        <h2 className="text-2xl font-bold">Loading Eco Data...</h2>
      </div>
    );
  }

  if (!data || data.totalCO2e === 0) {
    return (
      <div className="p-12 text-center bg-gray-50 rounded-xl m-6 border-2 border-dashed border-gray-300">
        <Factory className="mx-auto h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold text-gray-700">No Data Found</h2>
        <p className="text-gray-500 mb-6">Upload some activity data to see your dashboard!</p>
        <a href="/upload-activity" className="bg-[#2A553C] text-white px-6 py-3 rounded-lg hover:bg-green-800 transition">
          Go to Upload
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[#2A553C]">Carbon Footprint Dashboard</h1>
        <p className="text-gray-600">Overview of your organization’s emissions</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Emissions */}
        <div className="rounded-xl border bg-white p-6 shadow-sm border-l-4 border-l-[#2A553C]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Emissions</p>
              <h3 className="text-2xl font-bold text-gray-900">{data.totalCO2e.toFixed(2)} <span className="text-sm text-gray-400">kgCO2e</span></h3>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-700">
              <Factory size={24} />
            </div>
          </div>
        </div>

        {/* Electricity */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Electricity</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {(data.byCategory.find(c => c._id === "Electricity")?.totalCO2e || 0).toFixed(1)} kg
              </h3>
            </div>
            <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
              <Zap size={24} />
            </div>
          </div>
        </div>

        {/* Transport */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Transport</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {(data.byCategory.find(c => c._id === "Transport")?.totalCO2e || 0).toFixed(1)} kg
              </h3>
            </div>
            <div className="rounded-full bg-blue-100 p-3 text-blue-600">
              <Car size={24} />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <h3 className="text-2xl font-bold text-green-600">On Track</h3>
            </div>
            <div className="rounded-full bg-green-100 p-3 text-green-600">
              <TrendingUp size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Bar Chart */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Emissions by Source</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byCategory}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip cursor={{ fill: '#f3f4f6' }} />
                <Bar dataKey="totalCO2e" fill="#2A553C" radius={[4, 4, 0, 0]} barSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-900">Emission Breakdown</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.bySource}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.bySource.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;