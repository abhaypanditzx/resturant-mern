import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";

const MyBookings = () => {
  const { api } = useContext(AppContext);
  const [myBookings, setMyBookings] = useState([]);
  const fetchMyBookings = async () => {
    try {
      const { data } = await api.get("/api/booking/my-bookings");
      console.log(data);
      if (data.success) {
        setMyBookings(data.bookings);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(myBookings);
  useEffect(() => {
    fetchMyBookings();
  }, []);
  return (
    <div className="mx-w-5xl mx-auto mt-10 p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">My Bookings</h2>
      {myBookings.length === 0 ? (
        <p className="text-center text-gray-600">You have no bookings yet</p>
      ) : (
        <div className="space-y-6">
          {myBookings.map((booking) => (
            <div
              className="bg-whtie shadow-md rounded-2xl p-5 border border-gray-100 hover:shadow-lg transition "
              key={booking._id}
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-600 capitalize">{booking.name}</h3>
                <span
                  className={`px-3 py-1 text-sm rounded-full ${booking.status === "Pending" ? "text-yellow-700 bg-yellow-100 " : booking.status === "Approved" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {booking.status}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-700">
                <p>
                  <span className="font-medium">Phone:</span> {booking.phone}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(booking.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Time:</span> {booking.time}
                </p>
                <p>
                  <span className="font-medium">Guests:</span>{" "}
                  {booking.numberOfPeople}
                </p>
                {booking.note && (
                  <div className="mmt-3 text-gray-700">
                    <span className="font-medium">Note:</span> {booking.note}
                  </div>
                )}
                <div className="mt-3 text-gray-500 text-sm">
                  Booked on: {" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-GB",{
                    day:"2-digit",
                    month:"short",
                    year:"numeric"
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
