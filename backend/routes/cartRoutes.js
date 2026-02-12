const express = require("express");
const cartRoutes = express.Router();
const { protect } = require("../middlewares/authMiddleware.js");
const { addToCart, removeFromCart, getCart } = require("../controllers/cartController.js");



cartRoutes.post("/add",protect, addToCart)
cartRoutes.delete("/remove",protect,removeFromCart)
cartRoutes.get("/get",protect,getCart)
module.exports = cartRoutes;
