import React, { useContext, Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AppContext } from "./context/AppContext";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { Toaster } from "react-hot-toast";

// Lazy load pages for better performance
const Home = lazy(() => import("./pages/Home.jsx"));
const MyBookings = lazy(() => import("./pages/MyBookings.jsx"));
const MenuDetails = lazy(() => import("./pages/MenuDetails.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Signup = lazy(() => import("./pages/Signup.jsx"));
const BookTable = lazy(() => import("./pages/BookTable.jsx"));
const MyOrders = lazy(() => import("./pages/MyOrders.jsx"));
const Menu = lazy(() => import("./pages/Menu.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const Checkout = lazy(() => import("./pages/Checkout.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));

// Lazy load admin pages
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const AddCategory = lazy(() => import("./pages/admin/AddCategory.jsx"));
const AddMenu = lazy(() => import("./pages/admin/AddMenu.jsx"));
const Bookings = lazy(() => import("./pages/admin/Bookings.jsx"));
const Categories = lazy(() => import("./pages/admin/Categories.jsx"));
const Menus = lazy(() => import("./pages/admin/Menus.jsx"));
const Orders = lazy(() => import("./pages/admin/Orders.jsx"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard.jsx"));

const LoadingFallback = () => (
  <div className="flex bg-gray-50 flex-col items-center justify-center min-h-[70vh]">
    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-gray-500 font-medium tracking-wide">Loading...</p>
  </div>
);

const App = () => {
  const { admin } = useContext(AppContext);
  const adminPath = useLocation().pathname.includes("admin");

  return (
    <>
      {!adminPath && <Navbar />}
      <Toaster />
      <Suspense fallback={<LoadingFallback />}>
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
            <Route element={admin ? <Dashboard /> : <AdminLogin />} index />
            <Route element={admin ? <Bookings /> : <AdminLogin />} path="bookings" />
            <Route element={admin ? <Categories /> : <AdminLogin />} path="categories" />
            <Route element={admin ? <Menus /> : <AdminLogin />} path="menus" />
            <Route element={admin ? <Orders /> : <AdminLogin />} path="orders" />
            <Route element={admin ? <AddCategory /> : <AdminLogin />} path="add-category" />
            <Route element={admin ? <AddMenu /> : <AdminLogin />} path="add-menu" />
            <Route element={admin ? <AdminLayout /> : <AdminLogin />} path="layout" />
          </Route>
        </Routes>
      </Suspense>

      {!adminPath && <Footer />}
    </>
  );
};

export default App;
