import React, { useContext, useState } from "react";
import {
  BookAIcon,
  Grid3X3,
  LayoutDashboard,
  Menu,
  ShoppingCart,
  X,
  Plus,
  BoxIcon,
  Package,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Bell
} from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const menuItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      path: "/admin/categories",
      name: "Categories",
      icon: Grid3X3,
    },
    {
      path: "/admin/add-category",
      name: "New Category",
      icon: Plus,
    },
    {
      path: "/admin/menus",
      name: "Products / Menus",
      icon: Package,
    },
    {
      path: "/admin/add-menu",
      name: "New Menu Item",
      icon: Plus,
    },
    {
      path: "/admin/orders",
      name: "Orders",
      icon: ShoppingCart,
    },
    {
      path: "/admin/bookings",
      name: "Bookings",
      icon: BookAIcon,
    },
  ];

  const { api, navigate } = useContext(AppContext);
  const isActive = (path, exact = false) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const logout = async () => {
    try {
      const { data } = await api.post("/api/auth/admin/logout");
      if (data.success) {
        toast.success(data.msg);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50/50">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 h-20 px-8 border-b border-gray-50">
            <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-200">
              <ShieldCheck className="text-white" size={24} />
            </div>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              ADMIN <span className="text-orange-500 underline decoration-2 decoration-orange-200 underline-offset-4">PANEL</span>
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
            <p className="px-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-[0.2em] mb-4">Main Menu</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center px-4 py-3.5 text-sm font-bold rounded-2xl transition-all duration-300 relative
                    ${active ? "bg-orange-50 text-orange-600 shadow-sm" : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"}
                  `}
                >
                  <Icon size={20} className={`${active ? "text-orange-500" : "text-gray-400 group-hover:text-gray-900"} transition-colors`} />
                  <span className="ml-3.5 flex-1">{item.name}</span>
                  {active && <ChevronRight size={16} className="text-orange-300" />}
                </Link>
              );
            })}
          </nav>

          {/* Admin Profile & Logout */}
          <div className="p-6 border-t border-gray-50 bg-gray-50/30">
            <div className="flex items-center gap-3 p-3 mb-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center font-bold">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">Admin User</p>
                <p className="text-xs text-gray-500 truncate">admin@restuarant.com</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-rose-500 hover:bg-rose-600 rounded-2xl shadow-lg shadow-rose-100 transition-all active:scale-95"
            >
              <LogOut size={18} />
              Logout Session
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6 sm:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-xl font-extrabold text-gray-900 capitalize">
              {menuItems.find((item) => isActive(item.path, item.exact))?.name || "Settings"}
            </h2>
          </div>

          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative p-2 rounded-xl text-gray-400 hover:bg-gray-50 hover:text-gray-900 transition-all">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-gray-100 hidden sm:block"></div>
            <div className="hidden sm:flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">Administrator</p>
                <p className="text-[10px] font-extrabold text-emerald-500 uppercase tracking-wider">Online</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-100 border-2 border-orange-200 p-0.5 group-hover:scale-105 transition-transform">
                <img src="https://ui-avatars.com/api/?name=Admin&background=f97316&color=fff" alt="avatar" className="w-full h-full rounded-[inherit] object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-10">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
