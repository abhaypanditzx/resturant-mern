import { createContext, useEffect, useState } from "react";
import Profile from "../pages/Profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import api from "../utils/axios";
import toast from "react-hot-toast";
export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [categories, setCategories] = useState([]);
  const [menus, setMenus] = useState([]);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const { data } = await api.get("/api/auth/isAuth");
      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.log(error);
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

  useEffect(() => {
    getAdmin();
    getUser();
    fetchCategories();
    fetchMenus();
  }, []);

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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
export default AppContextProvider;
