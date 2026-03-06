import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import MenuCard from "./MenuCard";
const Menus = () => {
  const { menus, navigate, loading } = useContext(AppContext);
  console.log(loading)
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold  mb-3 ">
            Our <span className="text-yellow-500">Menu</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted dishes made with the
            finest ingredients{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            menus?.map((item) => (
              <MenuCard key={item._id} menu={item} />
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default Menus;
