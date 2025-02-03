import express from "express";
import cors from "cors";
// import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import "dotenv/config";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import {adminRouter} from "./admin-panel/admin-comfig.js";
import farmerRoute from "./routes/farmers.js";
import './config/db.js'

// App configuration
const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());
// import createFood from  './routes/formFood.js'
// createFood()

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/farmer", farmerRoute);
app.use("/api/v1/", adminRouter);

// Root Endpoint
app.get("/", (req, res) => {
  res.send("API Working");
});

// Connect to Database and Start Server
// then(() => {
  app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`);
  });
// }).catch((error) => {
  // console.error("Failed to start server due to database connection error:", error);
// });
