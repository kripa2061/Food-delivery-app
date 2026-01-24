import orderModel from "../Model/OrderModel.js";
import userModel from "../Model/UserModel.js";
import Stripe from "stripe";
import dotenv from "dotenv";
import { response } from "express";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

const placeorder = async (req, res) => {
  const frontend_url = "http://localhost:5173";

  try {
    const { userId, items, amount, address } = req.body;

    // ✅ CRITICAL FIX: block empty cart
    if (!items || items.length === 0) {
      return res.json({
        success: false,
        message: "Cart is empty",
      });
    }

    const newOrder = new orderModel({
      userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    // clear cart after order creation
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const line_items = items.map((item) => ({
      price_data: {
        currency: "npr",
        product_data: { name: item.name },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "npr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const verifyOrder=async(req,res)=>{
const {orderId,success}=req.body;
try {
  if(success=="true"){
    await orderModel.findByIdAndUpdate(orderId,{payment:true});
    res.json({success:true,message:"paid"})
  }else{
    await orderModel.findByIdAndDelete(orderId);
    res.json({success:false,message:"Not paid"})
  }
} catch (error) {
  res.json({success:false,message:error.message})
}
}

const userOrder = async (req, res) => {
  try {
     const orders = await orderModel.find({ userId: req.body.userId });
  res.json({ success: true, data: orders });
  } catch (error) {
    res.json({success:false,message:error.message})
  }
 
};

const listOrders=async(req,res)=>{
 try {
  const orders=await orderModel.find({});
  res.json({success:true,data:orders});
 } catch (error) {
  response.json({success:false,message:error.message});
 }
}
//updating order status
const updateStatus=async(req,res)=>{
try {
await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
res.json({success:true,message:"Status updated"})
} catch (error) {
  res.json({success:false,message:error.message})
}
}
const deleteOrder=async(req,res)=>{
try {
    const orderId=req.params.id;
  const orders=await orderModel.findByIdAndDelete(orderId);
  if(!orders){
    res.json({success:false,message:"order not found"})
  }else{
     res.json({success:true,message:"order deleted"})
  }
} catch (error) {
    res.json({success:false,message:error.message})
}
}

export { placeorder,verifyOrder, userOrder,listOrders,updateStatus,deleteOrder };
