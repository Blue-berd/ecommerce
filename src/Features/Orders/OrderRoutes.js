import express from "express";
import authMiddleware from "../../Middlewares/authMiddleware.js";
import {
  createOrder,
  getCompletedOrders,
  getLastOrder,
} from "./OrderController.js";
const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, getLastOrder);
orderRouter.get("/complete", authMiddleware, getCompletedOrders);

export default orderRouter;
