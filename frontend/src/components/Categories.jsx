import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Categories = () => {
  const { api, navigate, categories, loading } = useContext(AppContext);

  return (
    <section className=" py-16 from-gray-50 to-white ">
      <div className="container mx-auto px-4 text-center ">
        <h2 className="text-4xl font-bold mb-4">
          Explore Our <span className="text-yellow-500">Categories</span>
        </h2>{" "}
        <p>Discover delicious dishes from our carefully created categories</p>
        <div className="grid grid-cols-2 py-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-10">
              <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            categories?.map((item) => (
              <div key={item._id} onClick={() => navigate("/")} className="cursor-pointer group">
                <div className="relative">
                  <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-yellow-400 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl">
                    <img src={item.image} alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="absolute inset-0 w-32 h-32 mx-auto bg-linear-to-t rounded-full  from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"> </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-yellow-500 transition-colors duration-300">{item.name}</h3>
                  <p className=""></p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;
