import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Package,
  BookAIcon,
  Grid3X3,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp,
  ChevronRight,
  ArrowUpRight,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { api, admin, categories, menus } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const ordersRes = await api.get("/api/order/orders");
      const bookingsRes = await api.get("/api/booking/bookings");

      if (ordersRes.data) {
        setOrders(ordersRes.data);
      }
      if (bookingsRes.data && bookingsRes.data.success) {
        setBookings(bookingsRes.data.bookings);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin?.isAdmin || admin) {
      fetchData();
    }
  }, [admin]);

  const totalOrders = orders?.length || 0;
  const totalBookings = bookings?.length || 0;
  const totalMenus = menus?.length || 0;

  const totalRevenue = orders?.reduce((sum, order) => {
    if (order.status !== 'Cancelled') {
      return sum + (Number(order.totalAmount) || 0);
    }
    return sum;
  }, 0) || 0;

  const pendingOrders = orders?.filter(o => o.status === 'Pending')?.length || 0;
  const pendingBookings = bookings?.filter(b => b.status === 'Pending')?.length || 0;

  const recentOrders = [...orders].reverse().slice(0, 5);
  const recentBookings = [...bookings].reverse().slice(0, 5);

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      border: "border-emerald-100",
      link: "/admin/orders",
      trend: "+12.5% this month"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      subtitle: `${pendingOrders} Pending`,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-100",
      link: "/admin/orders",
      trend: "Across all items"
    },
    {
      title: "Table Bookings",
      value: totalBookings,
      subtitle: `${pendingBookings} Pending`,
      icon: Users,
      color: "text-purple-600",
      bg: "bg-purple-50",
      border: "border-purple-100",
      link: "/admin/bookings",
      trend: "Recent reservations"
    },
    {
      title: "Active Menu",
      value: totalMenus,
      icon: Package,
      color: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-100",
      link: "/admin/menus",
      trend: "Live items"
    },
  ];

  if (loading) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-orange-500"></div>
        <p className="mt-4 text-gray-500 font-medium">Crunching your data...</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div className="mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Dashboard <span className="text-orange-500">Overview</span>
          </h1>
          <p className="mt-2 text-base text-gray-600">
            Welcome back, <span className="font-semibold text-gray-800">Admin</span>. Here's what's happening today.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={fetchData}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all active:scale-95"
          >
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link} className="block group group-hover:-translate-y-1 transition-transform duration-300">
              <div className={`relative overflow-hidden rounded-3xl bg-white p-7 shadow-sm border ${stat.border} hover:shadow-xl transition-all duration-300`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-gray-400">{stat.title}</p>
                    <p className="mt-3 text-4xl font-black text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`rounded-2xl p-4 ${stat.bg} ${stat.color} ring-4 ring-white shadow-sm transition-transform duration-500 group-hover:rotate-12`}>
                    <Icon className="h-7 w-7" />
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {stat.subtitle ? (
                      <span className="flex items-center text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                        <Clock size={12} className="mr-1" />
                        {stat.subtitle}
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-gray-500">{stat.trend}</span>
                    )}
                  </div>
                  <ArrowUpRight size={18} className="text-gray-300 group-hover:text-gray-900 transition-colors" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">

        {/* Recent Orders */}
        <div className="rounded-[2.5rem] bg-white shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden transition-all hover:shadow-2xl hover:shadow-gray-200/50">
          <div className="border-b border-gray-100 px-8 py-7 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Orders</h3>
              <p className="text-sm text-gray-500">Most recent customer activity</p>
            </div>
            <Link to="/admin/orders" className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
              <ChevronRight size={24} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-500 font-bold">
                      {order.user?.name?.charAt(0) || "G"}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{order.user?.name || "Guest Details"}</p>
                      <p className="text-xs text-gray-400 font-medium truncate max-w-[180px] sm:max-w-xs">{order.address}</p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-sm font-black text-gray-900">₹{order.totalAmount}</p>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider
                      ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                        order.status === 'Preparing' ? 'bg-indigo-100 text-indigo-700' :
                          order.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-8 py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-50 text-gray-300 mb-4">
                  <ShoppingCart size={32} />
                </div>
                <p className="text-sm font-medium text-gray-500 italic">No recent orders found</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="rounded-[2.5rem] bg-white shadow-xl shadow-gray-100/50 border border-gray-100 overflow-hidden transition-all hover:shadow-2xl hover:shadow-gray-200/50">
          <div className="border-b border-gray-100 px-8 py-7 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Recent Bookings</h3>
              <p className="text-sm text-gray-500">Upcoming table reservations</p>
            </div>
            <Link to="/admin/bookings" className="p-2 rounded-full bg-gray-50 text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-all">
              <ChevronRight size={24} />
            </Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking._id} className="px-8 py-5 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{booking.name}</p>
                      <p className="text-xs text-gray-400 font-medium">
                        {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} • {booking.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    <p className="text-sm font-bold text-gray-900">
                      <span className="text-gray-400 font-medium mr-1">Qty:</span>{booking.numberOfPeople}
                    </p>
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider
                      ${booking.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                        booking.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-8 py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gray-50 text-gray-300 mb-4">
                  <Users size={32} />
                </div>
                <p className="text-sm font-medium text-gray-500 italic">No recent bookings found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
