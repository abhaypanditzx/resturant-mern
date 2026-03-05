import React, { useContext, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { AppContext } from "../context/AppContext";
import MenuCard from "../components/MenuCard";
const Menu = () => {
  const { menus } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMenus, setFilteredMenus] = useState([]);
  useEffect(() => {
    if (searchQuery === "") {
      setFilteredMenus(menus);
    } else {
      const filtered = menus.filter((menu) =>
        menu.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredMenus(filtered);
    }
  }, [searchQuery, menus]);
  const handleClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-12">
      <div className="containr mx-auto px-4">
        {/*header section*/}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold  mb-3 ">
            Our <span className="text-yellow-500">Menu</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our delicious selection of handcrafted dishes made with the
            finest ingredients{" "}
          </p>
          {/* search box  */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform- -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 rounded-full border-2 border-gray-200 focus:border-yellow-500 focus:outline-none transitin-colors duration-300 text-gray-700 placeholder-gray-400 shadow-md"
                type="text"
                value={searchQuery}
                placeholder="Search for your favorite dish..."
              />
              {searchQuery && (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 
                text-gray-400 hover:text-gray-600 transition-colors"
                  onClick={handleClearSearch}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        {/* result count  */}
        <div className="mb-6">
          <p className="text-gray-600 text-center">
            {
              searchQuery ? (
                <>
                  Found <span className="font-semibold text-yellow-600">{filteredMenus.length} </span>
                  {
                    filteredMenus.lengh === 1 ? "result" : "results"
                  } for {searchQuery}
                </>
              ) : (
                <>
                  Showing <span className="font-semibold text-yellow-600">{filteredMenus.length} </span>
                  {
                    filteredMenus.lengh === 1 ? "dish" : "dishes"
                  }
                </>
              )
            }
          </p>
        </div>
        {/* menu grid  */}

        {
          filteredMenus.length > 0 ? (
            <div className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {
                filteredMenus?.map((menu) => (
                  <MenuCard menu={menu} key={menu._id} />
                ))
              }
            </div>
          )
            : (
              <div className="text-center ">
                <p className="text-gray-600">
                  No results found for "{searchQuery}"
                </p>
                <button
                  onClick={handleClearSearch}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-full font-semibold transition-colors duration-300">
                  Clear Search
                </button>
              </div>
            )
        }
      </div>
    </div>
  );
};

export default Menu;
