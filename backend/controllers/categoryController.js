const Category = require("../models/categoryModel.js");
const cloudinary = require("cloudinary").v2;

const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || !req.file) {
      return res
        .status(400)
        .json({ msg: "name and image are required", success: false });
    }
    const alreadyExists = await Category.findOne({ name });
    if (alreadyExists) {
      return res
        .status(400)
        .json({ msg: "category already exists", success: false });
    }

    const result = await cloudinary.uploader.upload(req.file.path);
    const newCategory = await Category.create({
      name,
      image: result.secure_url,
    });
    return res
      .status(201)
      .json({ msg: "category added", success: true, Category: newCategory });
  } catch (err) {
    console.log(err)
    return res.json({ msg: "internal server error ", success: false });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, categories });
  } catch (err) {
    return res.json({ msg: "internal server error ", success: false });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.json({ msg: "category not found", success: false });
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      category.image = result.secure_url;
    }
    
    if (name) {
      category.name = name;
      await category.save();
      return res.json({ msg: "category updated", success: true, category });
    }
  } catch (err) {
    return res.json({ msg: "internal server error ", success: false });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ msg: "category not found" });
    }
    return res.status(200).json({ msg: "category deleted", success: true });
  } catch (err) {
    return res.json({ msg: "internal server error ", success: false });
  }
};


module.exports ={addCategory,getAllCategories,updateCategory,deleteCategory}