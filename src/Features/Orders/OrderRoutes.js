import express from "express";
import { createOrder, getOrders } from "./OrderController.js";
import sessionMiddleware from "../../Middlewares/sessionMiddlware.js";

const orderRouter = express.Router();

orderRouter.post("/orders", sessionMiddleware, createOrder);
orderRouter.get("/orders", sessionMiddleware, getOrders);

export default orderRouter;
