import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import {
  Package,
  BookAIcon,
  Grid3X3,
  ShoppingCart,
  DollarSign,
  Clock,
  TrendingUp
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
  const totalCategories = categories?.length || 0;
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
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-600",
      bg: "bg-green-100",
      link: "/admin/orders"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      subtitle: `${pendingOrders} Pending`,
      icon: ShoppingCart,
      color: "text-blue-600",
      bg: "bg-blue-100",
      link: "/admin/orders"
    },
    {
      title: "Table Bookings",
      value: totalBookings,
      subtitle: `${pendingBookings} Pending`,
      icon: BookAIcon,
      color: "text-purple-600",
      bg: "bg-purple-100",
      link: "/admin/bookings"
    },
    {
      title: "Menu Items",
      value: totalMenus,
      icon: Package,
      color: "text-orange-600",
      bg: "bg-orange-100",
      link: "/admin/menus"
    },
  ];

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, here's what's happening today.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.title} to={stat.link} className="block group">
              <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                    {stat.subtitle && (
                      <p className="mt-1 text-sm font-medium text-gray-600 flex items-center gap-1">
                        <Clock size={14} className="text-yellow-500" />
                        {stat.subtitle}
                      </p>
                    )}
                  </div>
                  <div className={`rounded-xl p-3 ${stat.bg} group-hover:scale-110 transition-transform`}>
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Activity Sections */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">

        {/* Recent Orders */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Orders</h3>
            <Link to="/admin/orders" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all &rarr;
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{order.user?.name || "Guest"}</p>
                    <p className="text-sm text-gray-500 truncate max-w-xs">{order.address}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">${order.totalAmount}</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Preparing' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-500">No recent orders</div>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-200 px-6 py-5 flex items-center justify-between">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Bookings</h3>
            <Link to="/admin/bookings" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all &rarr;
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentBookings.length > 0 ? (
              recentBookings.map((booking) => (
                <div key={booking._id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{booking.name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(booking.date).toLocaleDateString()} at {booking.time}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                      <span className="font-medium text-gray-900">{booking.numberOfPeople}</span> Guests
                    </p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${booking.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-gray-500">No recent bookings</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
