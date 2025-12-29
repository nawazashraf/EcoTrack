import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";
import { Leaf, Menu } from "lucide-react";

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Mobile Header */}
        <div className="flex items-center justify-between bg-[#2A553C] text-white p-4 lg:hidden">
          <div className="flex items-center gap-2 font-bold">
            <Leaf size={20} />
            EcoLOGS
          </div>

          <button onClick={() => setMobileOpen(true)}>
            <Menu />
          </button>
        </div>

        <main
          className={`transition-all duration-300 lg:${collapsed ? "ml-20" : "ml-64"}`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
