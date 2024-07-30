import express from "express";
import authMiddleware from "../../Middlewares/authMiddleware.js";
import { processPayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payment", authMiddleware, processPayment);

export default router;
