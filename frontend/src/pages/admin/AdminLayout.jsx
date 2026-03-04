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
  Package
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
      name: "All Categories",
      icon: Grid3X3,
    },
        {
      path: "/admin/add-category",
      name: "Add Category",
      icon: Plus,
    },{
      path: "/admin/add-menu",
      name: "Add Menu",
      icon: Package,
    },
    {
      path: "/admin/menus",
      name: "All Menus",
      icon: Grid3X3,
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

  const {api,navigate} = useContext(AppContext);
const isActive = (path, exact = false) => {
  if (exact) return location.pathname === path;
  return location.pathname.startsWith(path);
};


  const logout = async () => {

    try {
      const {data} = await api.post("/api/auth/admin/logout");
      if(data.success)
      toast.success(data.msg);
      navigate("/")

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-md bg-white shadow-lg hover:bg-gray-50 transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
${sidebarOpen ? "translate-x-0" : "-translate-x-full"} `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="flex items-center justify-center h-16 px-4 bg-secondary text-gray-900">
            <h1 className="text-xl font-bold">Admin Panel</h1>
          </div>
          <nav className="flex-1 px-4 py-6  space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 space-x-3
                    ${active ? "bg-blue-100 text-gray-900 border-r-4 border-gray-900" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"}`}
                >
                  <Icon size={24} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
          {/* footer  */}
          <div className="p-4 border-t flex items-center  border-gray-200">
            <div className="w-8 h-8   bg-gray-300 rounded-full  mr-3"></div>
            <div className="text-sm text-gray-500">
              <div className="font-medium text-gray-900">Admin User</div>
              <div>admin@gmail.com</div>
            </div>
          </div>
        </div>
      </div>

      {/* mobile overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black z-30 opacity-50 lg:hidden"
        ></div>
      )}
      {/* main content  */}

      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <header className="bg-white shadow-sm border-b border-b-gray-200 lg:pl-0 pl-16 ">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              {menuItems.find((item) => isActive(item.path, item.exact))
                ?.name || "Admin Panel"}
            </h2>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                <p
                  className=" cursor-pointer hover:underline text-red-500 text-lg font-semibold"
                  onClick={logout}
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </header>
        {/* content area  */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
