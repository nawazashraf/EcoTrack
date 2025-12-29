import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  FileText,
  ChevronLeft,
  ChevronRight,
  Factory,
  TrendingUp,
  Layers,
  BarChart3,
  Activity,
} from "lucide-react";

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300 
      ${collapsed ? "w-20 flex flex-col items-center " : "w-64"}`}
    >
      {/* SideBar Header*/}
      <div className="flex items-center justify-between border-b border-gray-800 p-4">
        {!collapsed && <span className="text-lg font-bold">EcoLOGS</span>}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-1 gap-y-2 px-2">
        <SidebarLink
          to="/"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/emission-by-source"
          icon={<Factory size={20} />}
          label="Emissions by Source"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/emission-trends"
          icon={<TrendingUp size={20} />}
          label="Emissions Trends"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/scope-analysis"
          icon={<Layers size={20} />}
          label="GHG Scope Analysis"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/performance-comparison"
          icon={<BarChart3 size={20} />}
          label="Performance Comparison"
          collapsed={collapsed}
        />
        <SidebarLink
          to="/forecast-and-risk"
          icon={<Activity size={20} />}
          label="Forecast & Risk"
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, collapsed }) => {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded px-3 py-2 text-sm transition
        ${
          isActive
            ? "bg-green-600 text-white"
            : "text-gray-300 hover:bg-gray-800"
        } ${collapsed && "flex justify-center items-center"}`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
