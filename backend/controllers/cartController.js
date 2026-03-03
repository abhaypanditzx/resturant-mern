const Cart = require("../models/cartModel.js");
const Menu = require("../models/menuModel.js");

const addToCart = async (req, res) => {
  try {
    const { menuId, quantity } = req.body;
    const { id } = req.user;
    const menuItem = await Menu.findById(menuId);
    console.log(menuId)
    if (!menuItem) {
      return res.status(404).json({ msg: "menu item not found" });
    }
    let cart = await Cart.findOne({ user: id });
    if (!cart) {
      cart = new Cart({
        user: id,
        items: [],
      });
    }
    const existingItem = cart.items.find(
      (item) => item.menuItem.toString() === menuId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuId, quantity });
    }
    await cart.save();
    res.status(200).json({ msg: "item added to cart", success: true, cart });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};

// get user cart
const getCart = async (req, res) => {
  try {
    const { id } = req.user;
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");

    if (!cart) {
      return res.status(200).json({ items: [] });
    }
    res.status(200).json({success:true, cart});
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};

const removeFromCart = async (req, res) => {
  const { menuId } = req.body;
  if (!menuId) {
  return res.status(400).json({ success: false, msg: "menuId is required" });
}
  try {
    const { id } = req.user;
    console.log(menuId)
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ msg: "cart not found" });
    }
    const item  = cart.items.find(item=> item.menuItem.toString() === menuId);
        if (!item) {
      return res.status(404).json({
        success: false,
        msg: "Item not found in cart",
      });
    }
    if(item.quantity >1){
      item.quantity -=1;
    }else{
        cart.items = cart.items.filter(
        (item) => item.menuItem.toString() !== menuId
      ); // remove only if quantity is 1
    }
    await cart.save();
    res.status(200).json({success:true,msg:"item removed from cart",cart})
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};

module.exports = {addToCart,removeFromCart,getCart}