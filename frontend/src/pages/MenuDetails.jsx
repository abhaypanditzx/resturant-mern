import React, { useContext, useState } from 'react'
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { ChevronLeft } from "lucide-react"
const MenuDetails = () => {
  const { id } = useParams();
  const { menus, navigate, addToCart, loading } = useContext(AppContext)

  const menu = menus.find((menu) => menu._id === id)

  if (loading) {
    return (
      <div className="flex bg-gray-50 flex-col items-center justify-center min-h-[70vh]">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-500 font-medium tracking-wide">Loading Menu Details...</p>
      </div>
    );
  }

  return menu ? (
    <div className="max-w-6xl w-full px-6">
      <p>
        <span>Home</span> /
        <span> menus</span> /
        <span> {menu?.category?.name}</span> /
        <span className="text-indigo-500"> {menu.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className="flex gap-3">

          m
          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img src={menu?.image} alt="Selected menu" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{menu.name}</h1>



          <div className="mt-6">
            <p className="text-gray-500/70 line-through">MRP: ₹{menu?.price + 50}</p>
            <p className="text-2xl font-medium">MRP: ₹{menu?.price}</p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About menu</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            <li>
              {menu?.description}
            </li>
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(menu?._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
              Add to Cart
            </button>
            <button onClick={() => navigate("/checkout")} className="w-full py-3.5 cursor-pointer font-medium bg-orange-500 text-white hover:bg-orange-600 transition" >
              Buy now
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div
      className='min-h-screen  flex items-center justify-center bg-gray-50'>
      <div className='text-center'>
        <h1 className='text-gray-800 font-bold text-3xl mb-4'>
          no menu item found
        </h1>
        <p className='text-gray-600 mb-6'>
          the item you're looking for doesn't exist
        </p>
        <button
          onClick={() => navigate("/menu")}
          className=" capitalize w-full py-3.5 max-w-2xl cursor-pointer font-medium flex items-center justify-center  bg-orange-500 text-white hover:bg-orange-600 transition">
          <ChevronLeft className='h-6 w-6' />
          <span>
            back to menu
          </span>
        </button>
      </div>
    </div>
  )
}

export default MenuDetails




