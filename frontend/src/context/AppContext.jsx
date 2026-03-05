import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "../utils/axios";
import toast from "react-hot-toast";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const fetchCart = async () => {
    try {
      const { data } = await api.get("/api/cart/get");
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (cart?.items) {
      const total = cart.items.reduce(
        (sum, item) => sum + item.menuItem.price * item.quantity,
        0,
      );
      setTotalPrice(total);
    }
  }, [cart]);
  const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0);

  const addToCart = async (menuId) => {
    try {
      const { data } = await api.post("/api/cart/add", { menuId, quantity: 1 });
      if (data.success) {
        toast.success(data.msg);
        fetchCart();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong!");
    }
  };
  const removeFromCart = async (menuId) => {
    try {
      const { data } = await api.delete("/api/cart/remove", {
        data: { menuId },
      });
      if (data.success) {
        toast.success(data.msg);
        fetchCart();
      } else {
        toast.error(data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    try {
      const { data } = await api.get("/api/auth/isAuth");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    }finally{
      setAuthLoading(false)
    }
  };
  const getAdmin = async () => {
    try {
      const { data } = await api.get("/api/auth/isAdmin");

      if (data.success) {
        setAdmin(data.admin);
      }
    } catch (error) {
      setAdmin(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/api/category/all");
      setCategories(data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMenus = async () => {
    try {
      const { data } = await api.get("/api/menu/all");
      setMenus(data.menuItems);
    } catch (error) {
      console.error(error);
    }
  };

  const adminPath = useLocation().pathname.includes("/admin");
 useEffect(() => {
    fetchCategories();
    fetchMenus();
  }, []);
  // user&admin data auth
  useEffect(() => {
    if (adminPath) {
      getAdmin();
    } else {
      getUser();
    }
  }, [adminPath]);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

 

  const value = {
    navigate,
    loading,
    setLoading,
    user,
    setUser,
    categories,
    api,
    admin,
    setAdmin,
    fetchCategories,
    menus,
    fetchMenus,
    addToCart,
    cart,
    cartCount,
    fetchCart,
    totalPrice,
    removeFromCart,
    setAuthLoading,
    authLoading
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
