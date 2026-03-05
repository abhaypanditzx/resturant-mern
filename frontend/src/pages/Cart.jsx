import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { Minus, Plus } from "lucide-react";
const Cart = () => {
  const { cart, totalPrice, navigate, addToCart, removeFromCart } =
    useContext(AppContext);

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center  h-64">
        <h1 className="text-gray-700 text-2xl font-semibold">no cart found</h1>
      </div>
    );
  }
  return (
    <div className=" max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center ">Your Cart </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-l-lg">
          <thead className="bg-gray-100 ">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700 ">Item</th>
              <th className="py-3 px-4 text-left text-gray-700 ">Qty</th>
              <th className="py-3 px-4 text-left text-gray-700 ">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart?.items?.map((item) => (
              <tr
                key={item._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item?.menuItem?.image}
                      alt={item?.menuItem?.name}
                      className="h-12 w-12 border border-gray-400 rounded-full object-cover overflow-hidden"
                    />
                    <span className="font-medium text-gray-800">{item?.menuItem?.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3 w-fit shadow-gray-350 rounded-lg shadow-md px-3 py-1">
                    <button onClick={() => removeFromCart(item?.menuItem?._id)}>
                      <Minus
                        className={`h-4 w-4 ${item.quantity === 0 ? "text-gray-400" : "text-gray-600"} cursor-pointer hover:text-gray-700`}
                      />
                    </button>
                    <span className="text-sm font-semibold">{item?.quantity}</span>
                    <button onClick={() => addToCart(item?.menuItem?._id)}>
                      <Plus className="h-4 w-4 cursor-pointer hover:text-gray-700 text-gray-600" />
                    </button>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700 font-medium">
                  ₹{item?.menuItem?.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex mt-6 items-center justify-between">
          <h3 className="font-semibold text-xl ">
            Total: <span className="text-green-600">₹{totalPrice ? totalPrice : 0}</span>
          </h3>
          <button
            onClick={() => navigate("/checkout")}
            className="py-2 px-6 bg-green-600 hover:bg-green-700 transition-colors cursor-pointer rounded-lg   text-white font-bold"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
