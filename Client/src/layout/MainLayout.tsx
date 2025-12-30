import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { Leaf, Menu } from "lucide-react";
import AuthSync from "../components/AuthSync";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <AuthSync />

      {/* SIDEBAR */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* CONTENT */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-[#2A553C] text-white px-4 py-3 lg:hidden">
          <div className="flex items-center gap-2 font-semibold">
            <Leaf size={20} />
            EcoLOGS
          </div>

          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-white/10"
          >
            <Menu />
          </button>
        </div>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
