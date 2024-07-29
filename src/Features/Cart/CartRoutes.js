import express from "express";
import sessionMiddleware from "../../Middlewares/sessionMiddlware.js";
import { addToCart, getCart } from "./CartController.js";

const cartRouter = express.Router();

cartRouter.post("/", sessionMiddleware, addToCart);
cartRouter.get("/", sessionMiddleware, getCart);

export default cartRouter;
