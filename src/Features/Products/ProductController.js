import { sendError, sendResponse } from "../../Utils/response.js";
import Product from "./ProductModel.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return sendResponse(res, "Products retrieved successfully", 200, products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req, res, next) => {
  const { name, description, price, stockQuantity } = req.body;
  try {
    const newProduct = new Product({ name, description, price, stockQuantity });
    await newProduct.save();
    return sendResponse(res, "Product created successfully", 201, newProduct);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return sendError(res, "Product not found", 404);
    }
    return sendResponse(res, "Product retrieved successfully", 200, product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, price, stockQuantity } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { name, description, price, stockQuantity },
      { new: true }
    );
    if (!product) {
      return sendError(res, "Product not found", 404);
    }
    return sendResponse(res, "Product updated successfully", 200, product);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return sendError(res, "Product not found", 404);
    }
    return sendResponse(res, "Product deleted successfully", 200, {
      message: "Product deleted",
    });
  } catch (error) {
    next(error);
  }
};
