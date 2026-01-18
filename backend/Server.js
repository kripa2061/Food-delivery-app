import './Config/env.js'

import express from "express";
import cors from "cors";

import foodRouter from "./Routes/FoodRoute.js";
import { connectDB } from "./Config/Database.js";


import UserRouter from "./Routes/UserRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import path from "path";
import cartRouter from "./Routes/CartRoute.js";
console.log("SMTPUSER:", process.env.SMTPUSER); // should print the username
console.log("SMTPPASS:", process.env.SMTPPASS);
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploads folder for images
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

// API routes
app.use("/api/food", foodRouter);
app.use("/api/user", UserRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart",cartRouter);

app.get("/", (req, res) => {
  res.send("API working");
});

// Connect DB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });
