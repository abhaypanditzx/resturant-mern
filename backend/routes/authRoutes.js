const express = require("express");
const authRoutes = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware.js");
const {
  registerUser,
  loginUser,
  adminLogin,
  logoutUser,
  getProfile,
  isAuth,
  isAdmin,
  logoutAdmin,
} = require("../controllers/authController.js");
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);
authRoutes.post("/admin/logout",adminOnly, logoutAdmin);
authRoutes.get("/profile", protect, getProfile);
authRoutes.get("/isAuth", protect, isAuth);
authRoutes.get("/isAdmin", adminOnly,isAdmin);

module.exports = authRoutes;
