import { sendError, sendResponse } from "../../Utils/response.js";
import Product from "../Products/ProductModel.js";
import Cart from "./CartModel.js";

export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.session.userId;

    const product = await Product.findById(productId);
    if (!product) return sendError(res, "Product not found", 404);

    let cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      cart = new Cart({ userId: userId, products: [] });
    }

    const existingProductIndex = cart.products.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (existingProductIndex >= 0) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    return sendResponse(res, "Product added to cart", 200, cart);
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const cart = await Cart.findOne({ userId: userId }).populate(
      "products.productId"
    );

    if (!cart) {
      return sendResponse(res, "Cart is empty", 200, []);
    }

    return sendResponse(res, "Cart retrieved successfully", 200, cart.products);
  } catch (error) {
    next(error);
  }
};
