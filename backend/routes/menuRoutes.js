const express = require("express");
const menuRoutes = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware.js");
const  upload  = require("../middlewares/multer.js");
const { getAllMenuItems, addMenuItem, updateMenuItems, deleteMenuItem } = require("../controllers/menuController.js");

menuRoutes.post("/add",adminOnly,upload.single("image"),addMenuItem);
menuRoutes.put("/update/:id",adminOnly,upload.single("image"),updateMenuItems );
menuRoutes.delete("/delete/:id",adminOnly,deleteMenuItem);
menuRoutes.get("/all",getAllMenuItems);



module.exports = menuRoutes;
