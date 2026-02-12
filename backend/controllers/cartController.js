const Cart = require("../models/cartModel.js");
const Menu = require("../models/menuModel.js");

const addToCart = async (req, res) => {
  try {
    const { menuItemId, quantity } = req.body;
    const { id } = req.user;
    const menuItem = await Menu.findById(menuItemId);
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
      (item) => item.menuItem === menuItemId,
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ menuItem: menuItemId, quantity });
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
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { menuItemId } = req.body;
    const cart = await Cart.findOne({ user: id });
    if (!cart) {
      return res.status(404).json({ msg: "cart not found" });
    }
    cart.items = cart.items.filter(
      (item) => item.menuItem.toString() !== menuItemId,
    );
    await cart.save();
    res.status(200).json({msg:"item removed from cart",success:true,cart})
  } catch (err) {
    console.log(err);
    return res.json({ msg: "internal server error ", success: false });
  }
};

module.exports = {addToCart,removeFromCart,getCart}