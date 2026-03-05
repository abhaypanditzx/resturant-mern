import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AppContext } from "./context/AppContext";
import MyBookings from "./pages/MyBookings.jsx";
import MenuDetails from "./pages/MenuDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import BookTable from "./pages/BookTable.jsx";
import MyOrders from "./pages/MyOrders.jsx";
import Menu from "./pages/Menu.jsx";
import Contact from "./pages/Contact.jsx";
import Checkout from "./pages/Checkout.jsx";
import Navbar from "./components/Navbar.jsx";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx"
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import AddCategory from "./pages/admin/AddCategory.jsx";
import AddMenu from "./pages/admin/AddMenu.jsx";
import Bookings from "./pages/admin/Bookings.jsx";
import Categories from "./pages/admin/Categories.jsx";
import Menus from "./pages/admin/Menus.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx"

const App = () => {
  const { admin } = useContext(AppContext);
  const adminPath = useLocation().pathname.includes("admin");
  return (
    <>
      {!adminPath && <Navbar />}
      <Toaster />
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login />} path="/login" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Checkout />} path="/checkout" />
        <Route element={<MyBookings />} path="/my-bookings" />
        <Route element={<Menu />} path="/menu" />
        <Route element={<MenuDetails />} path="/menu-details/:id" />
        <Route element={<Contact />} path="/contact" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<BookTable />} path="/book-table" />
        <Route element={<MyOrders />} path="/my-orders" />
        <Route element={<Profile />} path="/profile" />

        {/* admin routes  */}

        <Route element={admin ? <AdminLayout /> : <AdminLogin />} path="/admin">
          <Route element={admin ? <Dashboard /> : <AdminLogin />} path="dashboard" />
          <Route element={admin ? <Bookings /> : <AdminLogin />} path="bookings" />
          <Route element={admin ? <Categories /> : <AdminLogin />} path="categories" />
          <Route element={admin ? <Menus /> : <AdminLogin />} path="menus" />
          <Route element={admin ? <Orders /> : <AdminLogin />} path="orders" />
          <Route element={admin ? <AddCategory /> : <AdminLogin />} path="add-category" />
          <Route element={admin ? <AddMenu /> : <AdminLogin />} path="add-menu" />
          <Route element={admin ? <AdminLayout /> : <AdminLogin />} path="layout" />

        </Route>
      </Routes>


      {!adminPath && <Footer />}
    </>
  );
};

export default App;
