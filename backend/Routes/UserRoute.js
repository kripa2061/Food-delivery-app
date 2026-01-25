
import express from "express";
import { adminLogin,getAllUsers,getUser,loginUser,registerUser, verifyOtp,} from "../Controller/UserController.js";
import authMiddleware from "../Middleware/auth.js";

const UserRouter = express.Router();

UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.post("/verify-otp", verifyOtp);

UserRouter.get("/get", authMiddleware, getUser);

UserRouter.post("/adminlogin", adminLogin);


UserRouter.get(
  "/getUser",
  (req, res, next) => {
    req.requireAdmin = true;
    next();},
  authMiddleware,
  getAllUsers
);

export default UserRouter;
