import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import {ShoppingCartIcon} from "lucide-react"
const MenuCard = ({ menu }) => {
  const { navigate ,addToCart} = useContext(AppContext);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden  transition-all duration-300 group">
      {/* image section */}
      <div
        onClick={() => navigate(`/menu-details/${menu._id}`)}
        className="relative h-56 overflow-hidden cursor-pointer"
      >
        <img src={menu.image} alt={menu.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
        {/* overlay of hover  */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        {/* availability badage */}
{
  !menu.isAvailable&&(
    <div className="absolute top-0 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Unavailable
    </div>
  )
}

      </div>
      {/* content section  */}
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{menu.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{menu.description}</p>
        {/* price and add to cart  */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              ${menu.price}
            </p>
          </div>
          <button 
          disabled={!menu.isAvailable}
          onClick={()=>addToCart(menu._id)}
          className={`flex gap-2 items-center ${menu.isAvailable? "hover:bg-orange-600 cursor-pointer  bg-orange-500 text-white" : "bg-gray-300 hover:bg-gray-300 cursor-not-allowed text-gray-500"} px-3 py-2 rounded-lg  `}>
            <ShoppingCartIcon className="h-4 w-4"/>
            
            <span className="text-sm">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
