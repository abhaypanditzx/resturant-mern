import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {} from "lucide-react";
const BookTable = () => {
  const { api, navigate } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    numberOfPeople: "",
    date: "",
    time: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  const handleSubmit = async (e) => {
  e.preventDefault()
    try {
      const { data } = await api.post("/api/booking/create", formData);
      if (data.success) {
        toast.success(data.msg);
        navigate("/my-bookings");
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      toast.error("something went wrong!");
      console.log(error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-2xl  p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Book a Table</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            onChange={(e)=>handleChange(e)} 
            value={formData.name}
            placeholder="Your Name"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />

          <input
            type="email"
            name="email"
            onChange={(e)=>handleChange(e)} 
            value={formData.email}
            placeholder="Your Email"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
            type="tel"
            name="phone"
            onChange={(e)=>handleChange(e)} 
            value={formData.phone}
            placeholder="Phone Number"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />

          <input
            type="number"
            name="numberOfPeople"
            onChange={(e)=>handleChange(e)} 
            value={formData.numberOfPeople}
            placeholder="Number of Guests"
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
            type="date"
            name="date"
            onChange={(e)=>handleChange(e)} 
            value={formData.date}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />

          <input
            type="time"
            name="time"
            onChange={(e)=>handleChange(e)} 
            value={formData.time}
            className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none"
            required
          />
        </div>
        <textarea name="note" value={formData.note} onChange={(e)=>handleChange(e)} className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-green-500 focus:outline-none resize-none">

        </textarea>
        <button 
        type="submit"
        className="w-full bg-green-600 text-white  py-3 rounded-lg hover:bg-green-700 transition font-medium">Confirm Booking</button>
      </form>
    </div>
  );
};

export default BookTable;
