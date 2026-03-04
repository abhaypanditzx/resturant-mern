const Menu = require("../models/menuModel.js");
const cloudinary = require("cloudinary").v2;

const addMenuItem = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    console.log(name,price,description,category,req.file);
    if (!name || !price || !description || !category || !req.file) {
      return res
        .status(400)
        .json({ msg: "all field are required", success: false });
    }

  const result = await new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { resource_type: "image" },
    (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }
  );
  stream.end(req.file.buffer);
});
    const menuItem = await Menu.create({
      name: name,
      description: description,
      category: category,
      price: price,
      image: result.secure_url,
    });

    res.status(200).json({
      msg: "menu item added",
      success: true,
      menuItem: menuItem,
    });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};

const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name") 
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, menuItems});
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};

const updateMenuItems = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    const { id } = req.params;
    const menuItem =await  Menu.findById(id);
 
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      menuItem.image = result.secure_url;
    }
    if (name) menuItem.name = name;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (description) menuItem.description = description;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;
    await menuItem.save();
    res.status(200).json({ msg: "menu item updated", success: true ,menuItem});
  } catch (err) {

        console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};



const deleteMenuItem = async(req,res)=>{
    try{

        const {id} =req.params;
const menuItem = await  Menu.findByIdAndDelete(id);
res.status(200).json({msg:"menu item deleted",success:true})

    }catch(err){
            console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
    
}


module.exports  ={addMenuItem,updateMenuItems,deleteMenuItem,getAllMenuItems}