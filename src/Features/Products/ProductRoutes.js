import express from "express";
import checkRole from "../../Middlewares/checkRole.js";
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
productRouter.post("/", checkRole("admin"), createProduct);
productRouter.put("/:id", checkRole("admin"), updateProduct);
productRouter.delete("/:id", checkRole("admin"), deleteProduct);

export default productRouter;
