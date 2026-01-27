import foodModel from "../Model/FoodModel.js";
import OrderModel from "../Model/OrderModel.js";
import UserModel from "../Model/UserModel.js";

const getDashboardData = async (req, res) => {
  try {
    const totalOrders = await OrderModel.countDocuments();
    const totalUsers = await UserModel.countDocuments();
    const foods = await foodModel.find({ isActive: true });
    const activeFood = foods.length;

    const revenueAgg = await OrderModel.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$amount" } } }
    ]);
    const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

    res.json({
      success: true,
      data: { totalOrders, totalUsers, activeFood, totalRevenue, foods }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { getDashboardData };
