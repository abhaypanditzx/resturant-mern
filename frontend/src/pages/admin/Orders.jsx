import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { ShoppingBag, MapPin, CreditCard, RotateCw, ChevronDown } from "lucide-react";

const Orders = () => {
  const { api, loading, setLoading, admin } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/api/order/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const { data } = await api.put(`/api/order/update-status/${orderId}`, {
        status: newStatus,
      });
      if (data.success) {
        toast.success(data.msg);
        fetchOrders();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    if (admin?.isAdmin || admin) {
      fetchOrders();
    }
  }, [admin]);

  return (
    <div className="pb-12 px-4 sm:px-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Manage <span className="text-orange-500">Orders</span></h1>
          <p className="text-sm text-gray-500 mt-1">Review and process recent customer orders</p>
        </div>
        <button
          onClick={fetchOrders}
          className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
          title="Refresh List"
        >
          <RotateCw size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {orders?.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="p-6 sm:p-8">
                {/* Header Information */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-50 rounded-2xl text-orange-500">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{order.user?.name || "Guest Customer"}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md uppercase tracking-tighter">ID: {order._id.slice(-6)}</span>
                        <span className="text-xs text-gray-500 font-medium">{new Date(order.createdAt || Date.now()).toLocaleDateString(undefined, { dateStyle: 'medium' })}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-xl text-gray-600">
                      <CreditCard size={16} />
                      <span className="text-sm font-bold">₹{order.totalAmount}</span>
                    </div>
                    <div className="relative inline-block">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        disabled={loading}
                        className={`appearance-none pl-4 pr-10 py-2 rounded-xl text-sm font-bold border-0 ring-1 ring-gray-100 focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer shadow-sm
                          ${order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700' :
                            order.status === 'Preparing' ? 'bg-indigo-50 text-indigo-700' :
                              order.status === 'Cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
                    </div>
                  </div>
                </div>

                {/* Shipping info */}
                <div className="flex items-center gap-2 text-sm text-gray-500 px-4 py-3 bg-gray-50/50 rounded-2xl mb-6">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="font-medium truncate">{order.address}</span>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-[0.15em] mb-2 px-1">Order Summary</p>
                  {order.items?.map((menu, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white border border-gray-50 rounded-2xl p-3 hover:border-orange-100 transition-colors">
                      <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm shrink-0">
                        <img
                          src={menu?.menuItem?.image}
                          className="h-full w-full object-cover"
                          alt={menu?.menuItem?.name}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate">{menu?.menuItem?.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">x{menu?.quantity}</span>
                          <span className="text-xs font-bold text-gray-600">₹{menu?.menuItem?.price}</span>
                        </div>
                      </div>
                      <div className="text-right pr-2">
                        <p className="text-sm font-black text-gray-900">₹{menu?.quantity * menu?.menuItem?.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-[2rem] border border-gray-100 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <ShoppingBag size={40} />
            </div>
            <p className="text-lg font-bold text-gray-800">No active orders</p>
            <p className="text-sm text-gray-500 mt-2">When customers place orders, they'll show up here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
