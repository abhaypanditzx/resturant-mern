import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

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
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (admin.isAdmin) {
      fetchBookings();
    }
  }, []);

  return (
    <div className="py-24  px-3 sm:px-6">
      <h1 className="text-3xl font-bold text-center my-3">All Bookings</h1>
      <div className="border border-gray-400 max-w-5xl mx-auto p-3 rounded-lg">
        {/* headers */}

        <div className="hidden md:grid center grid-cols-6 font-semibold text-gray-700 mb-4">
          <div>Name</div>
          <div>Phone</div>
          <div>Persons</div>
          <div>Date</div>
          <div>Time</div>
          <div>Status</div>
        </div>
        <hr />
        {/* items */}

        <ul className="space-y-4 py-2">
          {bookings.map((item) => (
            <li
              key={item._id}
              className="border border-gray-700  rounded-lg p-3 md-2"
            >
              <div className="flex flex-col md:grid md:grid-cols-6  md:items-center gap-2 md:gap-0">
                <p className="font-medium text-center md:text-left">
                  {item.name}
                </p>
                <p className="font-medium text-center md:text-left">
                  {item.phone}
                </p>
                <p className="font-medium text-center md:text-left">
                  {item.numberOfPeople}
                </p>
                <p className="font-medium text-center md:text-left">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="font-medium text-center md:text-left">
                  {item.time}
                </p>
                <div className="flex justify-center md:justify-start items-center gap-2 md:gap-5 mt-2 md:mt-0">
                  <select
                    name="status"
                    value={item.status}
                    className="border rounded-md py-3 px-2"
                    disabled={loading}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bookings;
