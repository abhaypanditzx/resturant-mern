import React, { useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { AppContext } from "./context/AppContext";
import MyBookings from "./pages/Mybookings.jsx";
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

const App = () => {
  const { navigate } = useContext(AppContext);
  const adminPath = useLocation().pathname.includes("admin");
  return (
    <>
    {!adminPath && <Navbar/>}
    
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
      </Routes>
    </>
  );
};

export default App;
