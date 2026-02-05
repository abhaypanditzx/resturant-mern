const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const {connectDB} =  require('./config/db.js')
const authRoutes  = require('./routes/authRoutes.js')
const app = express();
// db connection 
connectDB()

//middlewares
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/auth",authRoutes)

const PORT = process.env.PORT;

app.get('/',(req,res)=>{
    res.send('hello')
})
app.listen(PORT || 5000, () => {
  console.log(`server is running on ${PORT}`);
});
