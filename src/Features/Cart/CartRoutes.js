import express from "express";
import authMiddleware from "../../Middlewares/authMiddleware.js";
import { addToCart, getCart } from "./CartController.js";
const cartRouter = express.Router();

cartRouter.post("/", authMiddleware, addToCart);
cartRouter.get("/", authMiddleware, getCart);

export default cartRouter;
