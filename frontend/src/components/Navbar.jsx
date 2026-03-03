import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import logo from "../assets/logo.png";
import {
  Calendar,
  LogOut,
  Menu,
  Package,
  ShoppingCart,
  User,
  UserCircle,

} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
const Navbar = () => {
  const { navigate, user, setUser, api,cartCount } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const { data } = await api.post("/api/auth/logout");
      if (data.success) {
        setUser(null);
        toast.success(data.msg);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="py-3 bg-cyan-50 w-full flex justify-around items-center shadow-md sticky top-0 z-50">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        {/* for desktop screens  */}
        <div className="flex items-center  justify-between h-16 ">
          {/* logo  */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-gray-400 border flex justify-center items-center ">
            <Link to="/" className="font-bold text-2xl text-blue-600">
              <img src={logo} alt="logo" />
            </Link>
          </div>

          {/* menu  */}
          <div className=" md:flex hidden items-center space-x-8 ">
            <Link
              to={"/"}
              className="text-gray-700 hover:text-blue-600 transition-colors  font-medium"
            >
              Home
            </Link>

            <Link
              to={"/menu"}
              className="text-gray-700 hover:text-blue-600 transition-colors  font-medium"
            >
              Menus
            </Link>

            <Link
              to={"/contact"}
              className="text-gray-700 hover:text-blue-600 transition-colors  font-medium"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/cart")}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <ShoppingCart size={22} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-base rounded-full w-5 h-5 flex items-center justify-center font-medium">
                {cartCount>0? cartCount : 0}
              </span>
            </button>
            <div className="hidden md:block">
              {user ? (
                <div className="relative ">
                  <button
                    className="p-2 hover:bg-gray-100  rounded-lg transition-colors"
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <UserCircle size={30} className="text-gray-700" />
                  </button>
                  {isProfileOpen && (
                    <div
                      className="absolute right-0 mt-1  w-48 bg-white rounded-lg shadow-lg border border-gray-100"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <Link
                        to={"/my-bookings"}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Calendar size={18} className="mr-3" />
                      My Bookings
                      </Link>
                      <Link
                        to={"/my-orders"}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Package size={18} className="mr-3" />
                        My Orders
                      </Link>
                      <button
                        onClick={() => handleLogout()}
                        className=" text-red-600 flex items-center px-4 w-full hover:bg-red-50 transition-colors py-2"
                      >
                        <LogOut size={18} className="mr-3" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-red-500  px-6 py-2 rounded-lg text-white hover:bg-red-600 transition-colors cursor-pointer font-medium"
                >
                  login
                </button>
              )}
            </div>
          </div>
          {/* <button onClick={()=>setIsMenuOpen(!isMenuOpen)}>
     <Menu/>
          </button> */}
        </div>
        {/* for small screen devices */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-b-gray-200 py-4">
            <div className="flex flex-col space-y-3">
              <Link
                to={"/"}
                className="text-gray-700 hover:text-blue-600 transition-colors  font-medium"
              >
                Home
              </Link>

              <Link
                to={"/menu"}
                className="text-gray-700 hover:text-blue-600 transition-colors  font-medium"
              >
                Menus
              </Link>

              <Link
                to={"/contact"}
                className="text-gray-700 hover:text-blue-600 transition-colors  font-medium"
              >
                Contact
              </Link>
              {user ? (
                <div className="relative ">
                  <button
                    className="p-2 hover:bg-gray-100  rounded-lg transition-colors"
                    onMouseEnter={() => setIsProfileOpen(true)}
                    onMouseLeave={() => setIsProfileOpen(false)}
                  >
                    <UserCircle size={30} className="text-gray-700" />
                  </button>
                  {isProfileOpen && (
                    <div
                      className="absolute right-0 mt-1  w-48 bg-white rounded-lg shadow-lg border border-gray-100"
                      onMouseEnter={() => setIsProfileOpen(true)}
                      onMouseLeave={() => setIsProfileOpen(false)}
                    >
                      <Link
                        to={"/my-bookings"}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <Package size={18} className="mr-3" />
                        My Orders
                      </Link>
                      <button
                        onClick={() => handleLogout()}
                        className=" text-red-600 flex items-center px-4 w-full hover:bg-red-50 transition-colors py-2"
                      >
                        <LogOut size={18} className="mr-3" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="bg-red-500  px-6 py-2 rounded-lg text-white hover:bg-red-600 transition-colors cursor-pointer font-medium"
                >
                  login
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
