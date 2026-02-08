const express = require("express");
const categoryRoutes = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware.js");
const  upload  = require("../middlewares/multer.js");
const {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController.js");

categoryRoutes.post("/add", protect, adminOnly, upload.single("image"), addCategory);
categoryRoutes.get("/all", getAllCategories);
categoryRoutes.put(
  "/update/:id",
  adminOnly,
  upload.single("image"),
  updateCategory,
);
categoryRoutes.put("/delete/:id", adminOnly, deleteCategory);

module.exports = categoryRoutes;
