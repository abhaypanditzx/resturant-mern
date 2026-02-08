const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {connectDB} =  require('./config/db.js')
const authRoutes  = require('./routes/authRoutes.js')
const categoryRoutes  = require('./routes/categoryRoutes.js')
const connectCloudinary = require('./config/cloudinary.js');
const menuRoutes = require("./routes/menuRoutes.js")
const app = express();
// connections
connectDB()
connectCloudinary()

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth",authRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/menu",menuRoutes)

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(PORT || 5000, () => {
  console.log(`server is running on ${PORT}`);
});
