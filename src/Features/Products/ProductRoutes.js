import express from "express";
import authMiddleware from "../../Middlewares/authMiddleware.js";
import checkRole from "../../Middlewares/checkRole.js";
import { uploadImages } from "../../Middlewares/uploadImages.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./ProductController.js";

const productRouter = express.Router();

// Public routes
productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductById);

// Admin routes
productRouter.post(
  "/",
  authMiddleware,
  checkRole("admin"),
  uploadImages("products"),
  createProduct
);
productRouter.put("/:id", authMiddleware, checkRole("admin"), updateProduct);
productRouter.delete("/:id", authMiddleware, checkRole("admin"), deleteProduct);

export default productRouter;
