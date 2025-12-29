import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ChevronLeft,
  ChevronRight,
  Factory,
  TrendingUp,
  Layers,
  BarChart3,
  Activity,
  Leaf,
  Plus,
  Upload,
} from "lucide-react";
import type React from "react";

type SidebarLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  end?: boolean;
};

const Sidebar = ({ collapsed, setCollapsed }) => {
  return (
    <aside
      className={`font-inter fixed left-0 top-0 h-screen bg-gray-900 text-white transition-all duration-300  bg-linear-to-b from-[#2A563C] via-[#284F38] to-[#244230]
      ${collapsed ? "w-20 " : "w-64"}`}
    >
      {/* SideBar Header*/}
      <div
        className={`flex items-center border-b border-[#3A6A4C]/40 p-4
        ${collapsed ? "justify-center" : "justify-between"}`}
      >
        {!collapsed && (
          <span className="text-lg font-bold flex items-center gap-x-2">
            <Leaf size={20} />
            EcoLOGS
          </span>
        )}

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 hover:bg-gray-800"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-x-1 gap-y-3 px-2">
        <SidebarLink
          to="/"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
          collapsed={collapsed}
          end
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
        {/* Divider */}
        <div className="my-4 flex items-center gap-3 px-3">
          <div className="h-px flex-1 bg-white/20" />

          {!collapsed && (
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Quick Actions
            </span>
          )}

          <div className="h-px flex-1 bg-white/20" />
        </div>
        <SidebarLink
          to="/add-activity"
          icon={<Plus size={20} />}
          label="Add Activity"
          collapsed={collapsed}
        />

        <SidebarLink
          to="/upload-activity"
          icon={<Upload size={20} />}
          label="Upload Activity"
          collapsed={collapsed}
        />
      </nav>
    </aside>
  );
};

const SidebarLink = ({ to, icon, label, collapsed, end }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `group flex items-center gap-3 rounded px-3 py-2 text-sm transition
        ${
          isActive
            ? "bg-[#26D971] text-black"
            : "text-gray-300 hover:bg-[#26D971]/20"
        } ${collapsed && "flex justify-center items-center"}`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}
      {/* Tooltip  */}
      {collapsed && (
        <span className="absolute left-14 z-10 hidden whitespace-nowrap rounded bg-[#1F3A2B] px-2 py-1 text-xs text-white group-hover:block">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;
