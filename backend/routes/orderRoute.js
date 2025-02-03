import express from "express"
import authMiddleware from "../middleware/auth.js"
import { rateOrder,placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"

const orderRouter = express.Router();

orderRouter.post("/place",placeOrder);
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",userOrders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)
orderRouter.post("/rate",rateOrder)


export default orderRouter;