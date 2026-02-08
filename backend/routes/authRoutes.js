const express = require("express");
const authRoutes = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");
const {
  registerUser,
  loginUser,
  adminLogin,
  logoutUser,
  getProfile,
} = require("../controllers/authController.js");
authRoutes.post("/register", registerUser);
authRoutes.post("/login", loginUser);
authRoutes.post("/admin/login", adminLogin);
authRoutes.post("/logout", logoutUser);
authRoutes.post("/profile", protect, getProfile);

module.exports = authRoutes;
