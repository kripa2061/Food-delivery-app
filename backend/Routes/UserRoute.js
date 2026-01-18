
import express from "express";
import { adminLogin,getUser,loginUser,registerUser, verifyOtp,} from "../Controller/UserController.js";
import authMiddleware from "../Middleware/auth.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/verify-otp", verifyOtp);

UserRouter.get("/get", authMiddleware, getUser);

UserRouter.post("/adminlogin", adminLogin);
export default UserRouter;
