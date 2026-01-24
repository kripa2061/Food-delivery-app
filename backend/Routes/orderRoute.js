import express from "express";
import authMiddleware from "../Middleware/auth.js";
import { deleteOrder, listOrders, placeorder, updateStatus, userOrder, verifyOrder } from "../Controller/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeorder);
orderRouter.post("/verify",  verifyOrder);
orderRouter.post("/userorder",authMiddleware,userOrder);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/deleteOrderbyId/:id",deleteOrder)
export default orderRouter;
