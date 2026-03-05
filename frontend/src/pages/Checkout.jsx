import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
const CheckOut = () => {
  const { api, totalPrice } = useContext(AppContext);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash on delivery");

  const handleCheckout = async ()=>{
    if(!address){
      toast.error("please enter address")
      return;
    }
    try {
      
      const {data} = await api.post("/api/order/place",{address,paymentMethod})
      if(data.success){
        toast.success(data.msg)
      }else{
        toast.error(data.msg)

      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-5xl bg-white mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 p-6 shadow-lg rounded-2xl ">
      {/* left side order summary  */}

   <div>
       <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Delivery Address
        </h2>
        <textarea
          rows={5}
          placeholder="enter  your full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2  focus:ring-green-500 focus:outline-none resize-none"
        ></textarea>
      </div>

      {/* right side order summary  */}
      <div className="flex flex-col border border-gray-200 rounded-lg p-4 mb-4 ">
        <p className="flex justify-between text-lg font-medium text-gray-700 ">
          <span className="">Total Amount:</span>
          <span className="text-green-600 font-semibold">₹{totalPrice}</span>
        </p>
      </div>
   </div>


      <div className="py-12 ">
        <h3 className="text-lg font-medium mb-2 text-gray-800">payment Method</h3>
        <label htmlFor="" className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "cash on delivery"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="text-green-600 focus:ring-green-500"
            value="cash on delivery"
          />
          <span>Cash on Delivery</span>
        </label>

        <label htmlFor="" className="flex items-center space-x-3">
          <input
            type="radio"
            name="payment"
            checked={paymentMethod === "online payment"}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="text-green-600 focus:ring-green-500"
            value="online payment"
          />
          <span>Online Payment</span>
        </label>
        <button
        onClick={handleCheckout}
        className="mt-6 bg-green-600 px-6 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium cursor-pointer">Confirm Order</button>
      </div>
    </div>
  );
};

export default CheckOut;
