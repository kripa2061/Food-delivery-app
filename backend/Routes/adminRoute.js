import express from "express";
import { getDashboardData } from "../Controller/Dashboard.js";
const adminRouter=express.Router();
adminRouter.get("/dashboard",getDashboardData);
export default adminRouter;