import express from "express";
import multer from "multer";
import { addFood, editFood, foodList, getFoodById, removefood } from "../Controller/FoodController.js";
import path from "path";

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
  destination: path.join(path.resolve(), "uploads"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); 
  },
});

const upload = multer({ storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list",foodList);
foodRouter.post("/delete",removefood)
foodRouter.post("/edit/:id", upload.single("image"), editFood);
foodRouter.get("/:id", getFoodById);
export default foodRouter;
