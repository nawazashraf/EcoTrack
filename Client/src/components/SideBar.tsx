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
import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/clerk-react";

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
};

type SidebarLinkProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  end?: boolean;
  onClick?: () => void;
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return isMobile;
};

const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) => {
  const isMobile = useIsMobile();
  const { user } = useUser(); 
  const isCollapsed = isMobile ? false : collapsed;

  return (
    <aside
      className={`
        z-50 min-h-screen text-white
        bg-linear-to-b from-[#2A563C] via-[#284F38] to-[#244230]
        transition-all duration-300
        fixed left-0 top-0
        flex flex-col  /* <--- 3. ADDED FLEX COL TO PUSH FOOTER DOWN */
        ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        w-64
        lg:relative lg:translate-x-0
        ${isCollapsed ? "lg:w-20" : "lg:w-64"}
      `}
    >
      {/* Header */}
      <div
        className={`flex items-center border-b border-[#3A6A4C]/40 p-4
        ${isCollapsed ? "justify-center" : "justify-between"}`}
      >
        {!isCollapsed && (
          <span className="text-lg font-bold flex items-center gap-2">
            <Leaf size={20} />
            EcoLOGS
          </span>
        )}

        {/* Desktop collapse only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:block rounded p-1 hover:bg-gray-800"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="mt-4 flex flex-col gap-y-3 px-2 flex-1"> {/* <--- Added flex-1 to push footer */}
        <SidebarLink to="/" icon={<LayoutDashboard size={20} />} label="Dashboard" collapsed={isCollapsed} end onClick={() => setMobileOpen(false)} />
        <SidebarLink to="/emission-by-source" icon={<Factory size={20} />} label="Emissions by Source" collapsed={isCollapsed} onClick={() => setMobileOpen(false)} />
        <SidebarLink to="/emission-trends" icon={<TrendingUp size={20} />} label="Emissions Trends" collapsed={isCollapsed} onClick={() => setMobileOpen(false)} />
        <SidebarLink to="/scope-analysis" icon={<Layers size={20} />} label="GHG Scope Analysis" collapsed={isCollapsed} onClick={() => setMobileOpen(false)} />
        <SidebarLink to="/performance-comparison" icon={<BarChart3 size={20} />} label="Performance Comparison" collapsed={isCollapsed} onClick={() => setMobileOpen(false)} />
        <SidebarLink to="/forecast-and-risk" icon={<Activity size={20} />} label="Forecast & Risk" collapsed={isCollapsed} onClick={() => setMobileOpen(false)} />

        {/* Divider */}
        <div className="my-4 flex items-center gap-3 px-3">
          <div className="h-px flex-1 bg-white/20" />
          {!isCollapsed && (
            <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
              Quick Actions
            </span>
          )}
          <div className="h-px flex-1 bg-white/20" />
        </div>

        <SidebarLink to="/add-activity" icon={<Plus size={20} />} label="Add Activity" collapsed={isCollapsed} onClick={() => setMobileOpen(false)} />
        <SidebarLink to="/upload-activity" icon={<Upload size={20} />} label="Upload Activity" collapsed={isCollapsed} onClick={() => setMobileOpen(false)} />
      </nav>

      {/* ✅ 4. USER PROFILE & LOGOUT SECTION */}
      <div className={`border-t border-[#3A6A4C]/40 p-4 ${isCollapsed ? "flex justify-center" : ""}`}>
        <div className="flex items-center gap-3">
          {/* Clerk User Button - Handles Logout automatically */}
          <UserButton afterSignOutUrl="/login" />
          
          {!isCollapsed && user && (
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-medium">{user.fullName}</span>
              <span className="truncate text-xs text-gray-300">{user.primaryEmailAddress?.emailAddress}</span>
            </div>
          )}
        </div>
      </div>

    </aside>
  );
};


const SidebarLink = ({
  to,
  icon,
  label,
  collapsed,
  end,
  onClick,
}: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `relative group flex items-center gap-3 rounded px-3 py-2 text-sm transition
        ${
          isActive
            ? "bg-[#26D971] text-black"
            : "text-gray-300 hover:bg-[#26D971]/20"
        }
        ${collapsed ? "justify-center" : ""}`
      }
    >
      {icon}
      {!collapsed && <span>{label}</span>}

      {/* Tooltip (desktop collapsed only) */}
      {collapsed && (
        <span className="absolute left-14 z-10 hidden whitespace-nowrap rounded bg-[#1F3A2B] px-2 py-1 text-xs text-white group-hover:block">
          {label}
        </span>
      )}
    </NavLink>
  );
};

export default Sidebar;