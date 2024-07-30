import express from "express";
import authMiddleware from "../../Middlewares/authMiddleware.js";
import { createOrder, getOrders } from "./OrderController.js";
const orderRouter = express.Router();

orderRouter.post("/", authMiddleware, createOrder);
orderRouter.get("/", authMiddleware, getOrders);

export default orderRouter;
