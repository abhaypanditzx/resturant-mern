const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { connectDB } = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const connectCloudinary = require("./config/cloudinary.js");
const menuRoutes = require("./routes/menuRoutes.js");
const cartRoutes = require("./routes/cartRoutes.js");
const orderRoutes = require("./routes/orderRoutes.js");
const bookingRoutes = require("./routes/bookingRoutes.js");
const app = express();
// connections
connectDB();
connectCloudinary();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin:"https://resturant-app-pi.vercel.app/",
    credentials:true,
  }),
);
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/booking", bookingRoutes);

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(PORT || 5000, () => {
  console.log(`server is running on ${PORT}`);
});
