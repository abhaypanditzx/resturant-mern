const Order = require("../models/orderModel.js");
const Cart = require("../models/cartModel.js");

const placeOrder = async (req, res) => {
  try {
    const { id } = req.user;
    const {address} = req.body;
    console.log(address)
    if (!address) {
      return res
        .status(400)
        .json({ msg: "delivery address is required", success: false });
    }
    const cart = await Cart.findOne({ user: id }).populate("items.menuItem");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ msg: "your cart is empty" });
    }
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.menuItem.price * item.quantity,
      0,
    );
    const newOrder = await Order.create({
      user: id,
      items: cart.items.map((i) => ({
        menuItem: i.menuItem._id,
        quantity: i.quantity,
      })),
      address,
      totalAmount
    });

    cart.items = [];
    await cart.save();
    res
      .status(201)
      .json({
        msg: "order placed successfully",
        success: true,
        order: newOrder,
      });
  } catch (err) {
    console.log(err);
       res.status(500).json({ msg: "internal server error" });

  }
};





const getUserOrder = async(req,res)=>{
    try{
const {id}  = req.user;
const orders = await Order.find({user:id}).sort({createdAt:-1});
res.json(orders)
    }catch(err){
        console.log(err);
    res.status(500).json({ msg: "internal server error" });
    }
}


const getAllOrder = async(req,res)=>{
    try{
const orders = await Order.find().populate("user").populate("items.menuItem").sort({createdAt:-1});
res.status(200).json(orders)
    }catch(err){
        console.log(err);
    res.status(500).json({ msg: "internal server error" });
    }
}

const updateOrderStatus = async(req,res)=>{
    try{
        const {orderId} = req.params;
        const {status} = req.body;
        console.log(status)
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(404).json({msg:"order not found"})
        }
        order.status =  status;
        await order.save();
        res.json({msg:"order status updated" , success:true})
    }
    catch(err){
        console.log(err);
    res.status(500).json({ msg: "internal server error" });

    }    
}

module.exports = {placeOrder,getUserOrder,getAllOrder,updateOrderStatus}




