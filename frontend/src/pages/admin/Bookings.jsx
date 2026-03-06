import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { Users, Phone, Calendar, Clock, RotateCw, ChevronDown, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const Bookings = () => {
  const { api, loading, setLoading, admin } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/api/booking/bookings");
      if (data.success) {
        setBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch bookings");
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      const { data } = await api.put(
        `/api/booking/update-status/${bookingId}`,
        { status: newStatus },
      );
      if (data.success) {
        fetchBookings();
        toast.success(data.msg);
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("Status update failed");
    } finally {
      // setLoading(false); // This was setting global loading to false, might not be needed here if handled by api call
    }
  };

  useEffect(() => {
    if (admin?.isAdmin || admin) {
      fetchBookings();
    }
  }, [admin]);

  return (
    <div className="pb-12 px-4 sm:px-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Table <span className="text-orange-500">Bookings</span></h1>
          <p className="text-sm text-gray-500 mt-1">Manage restaurant reservations and seatings</p>
        </div>
        <button
          onClick={fetchBookings}
          className="p-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-colors shadow-sm"
        >
          <RotateCw size={18} className="text-gray-600" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {bookings?.length > 0 ? (
          bookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-6">

                {/* Guest Info */}
                <div className="flex items-center gap-4 min-w-[200px]">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg
                    ${booking.status === 'Approved' ? 'bg-emerald-50 text-emerald-600' :
                      booking.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 'bg-orange-50 text-orange-600'}`}>
                    {booking.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{booking.name}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 mt-0.5">
                      <Phone size={12} />
                      <span className="text-xs font-medium">{booking.phone}</span>
                    </div>
                  </div>
                </div>

                {/* Reservation Details */}
                <div className="grid grid-cols-3 flex-1 gap-4 py-4 md:py-0 border-y md:border-y-0 md:border-x border-gray-50 px-0 md:px-8">
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Guests</p>
                    <div className="flex items-center gap-2 text-gray-900 font-black">
                      <Users size={16} className="text-orange-500" />
                      <span>{booking.numberOfPeople}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Date</p>
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <Calendar size={16} className="text-blue-500" />
                      <span className="text-sm">
                        {new Date(booking.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Time</p>
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <Clock size={16} className="text-purple-500" />
                      <span className="text-sm">{booking.time}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between md:justify-end gap-4 min-w-[180px]">
                  <div className="md:hidden flex items-center gap-2">
                    {booking.status === 'Approved' && <CheckCircle2 size={18} className="text-emerald-500" />}
                    {booking.status === 'Cancelled' && <XCircle size={18} className="text-rose-500" />}
                    {booking.status === 'Pending' && <AlertCircle size={18} className="text-amber-500" />}
                    <span className="text-xs font-bold uppercase text-gray-400 tracking-wider font-mono">Status</span>
                  </div>

                  <div className="relative">
                    <select
                      value={booking.status}
                      onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                      disabled={loading}
                      className={`appearance-none pl-4 pr-10 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider border-0 ring-1 ring-inset ring-gray-100 focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer shadow-sm
                          ${booking.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
                          booking.status === 'Cancelled' ? 'bg-rose-50 text-rose-700' : 'bg-amber-50 text-amber-700'}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 text-current" />
                  </div>
                </div>

              </div>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-3xl border border-gray-100 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
              <Calendar size={40} />
            </div>
            <p className="text-lg font-bold text-gray-800">No reservations found</p>
            <p className="text-sm text-gray-500 mt-2">Any table bookings made by users will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
