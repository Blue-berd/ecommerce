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
  const image = req.fileUrl;
  console.log("img", image);
  try {
    const product = new Product({
      name,
      description,
      price,
      stockQuantity,
      image,
    });

    // Validate the instance
    const validationError = product.validateSync();
    if (validationError) {
      console.error(validationError); // Log the full error object for debugging
      return res.status(400).json({ message: validationError.message });
    }

    // Save the product
    const newProduct = await product.save();
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

  // Create an update object with only the fields provided
  const updateFields = {};
  if (name) updateFields.name = name;
  if (description) updateFields.description = description;
  if (price) updateFields.price = price;
  if (stockQuantity) updateFields.stockQuantity = stockQuantity;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      updateFields,
      { new: true, runValidators: true } // Return updated document and run validators
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
