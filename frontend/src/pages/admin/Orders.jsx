import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Orders = () => {
  const { api, loading, setLoading, admin } = useContext(AppContext);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get("/api/order/orders");
      console.log(data);

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {

    try {
      const { data } = await api.put(`/api/order/update-status/${orderId}`, {status:newStatus});
      if (data.success) {
       toast.success(data.msg);
       fetchOrders()
      } else {
        console.log(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (admin.isAdmin) {
      console.log("is admin: ", admin.isAdmin);
      fetchOrders();
    }
  }, []);

  return (
    <div className="py-24  px-3 sm:px-6">
      <h1 className="text-3xl font-bold text-center my-3">All Orders</h1>
      <div className="border border-gray-400 max-w-5xl mx-auto p-3 rounded-lg">
        {/* headers */}

        <div className="hidden md:grid center grid-cols-5 font-semibold text-gray-700 mb-4">
          <div>Name</div>
          <div>Address</div>
          <div>Total Amount</div>
          <div>Payment Method</div>
          <div>Status</div>
        </div>
        <hr />
        {/* items */}

        <ul className="space-y-4">
          {orders.map((item) => (
            <li key={item._id} className="boreder rounded-lg p-3 md-2">
              <div className="flex flex-col md:grid md:grid-cols-5  md:items-center gap-2 md:gap-0">
                <p className="font-medium text-center md:text-left">
                  {item.user.name}
                </p>
                <p className="font-medium text-center md:text-left">
                  {item.address}
                </p>
                <p className="font-medium text-center md:text-left">
                  {item.totalAmount}
                </p>
                <p className="font-medium text-center md:text-left">
                  {item.user.name}
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
                    <option value="Preparing">Preparing</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
              {/* render menu items  */}
              <div className="mt-3">
                {item.items.map((menu, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 border rounded-lg p-2 my-2 "
                  >
                    <img
                      src={menu?.menuItem?.image}
                      className="h-16 w-16 object-cover"
                      alt={menu?.menuItem?.name}
                    />
                    <div>
                      <p className="font-semibold">{menu?.menuItem?.name}</p>
                      <p className="text-sm text-gray-600">
                        QTY:{menu?.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        QTY:{menu?.menuItem?.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Orders;
