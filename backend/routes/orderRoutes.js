const express = require("express")
const app = express();
const orderRoutes = express.Router();
const {protect, adminOnly} = require("../middlewares/authMiddleware.js")
const {placeOrder,getUserOrder,getAllOrder,updateOrderStatus} = require("../controllers/orderController")

orderRoutes.post("/place",protect,placeOrder);
orderRoutes.get("/my-orders",protect,getUserOrder)
orderRoutes.get("/orders",adminOnly,getAllOrder)
orderRoutes.put("/update-status/:orderId",adminOnly,updateOrderStatus)


module.exports =  orderRoutes; 