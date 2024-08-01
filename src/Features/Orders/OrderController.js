import { sendResponse } from "../../Utils/response.js";
import Cart from "../Cart/CartModel.js";
import Product from "../Products/ProductModel.js";
import User from "../Users/UserModel.js";
import Order from "./OrderModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const { cartItems } = req.body;

    console.log("Request Body:", req.body);

    if (!cartItems || !Array.isArray(cartItems)) {
      throw new Error("Cart items are missing or not an array");
    }

    // Ensure taxRate and shippingCost are numbers
    const taxRateNum = parseFloat(taxRate);
    const shippingCostNum = parseFloat(shippingCost);

    if (isNaN(taxRateNum) || isNaN(shippingCostNum)) {
      throw new Error("Invalid tax rate or shipping cost");
    }

    const userId = req.session.userId;

    // Fetch product details and calculate subtotal
    const orderProducts = await Promise.all(
      cartItems.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error(`Product with ID ${productId} not found`);
        return { productId, price: product.price, quantity };
      })
    );

    const subtotal = orderProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    // Calculate tax and shipping
    const tax = (subtotal * 0.03) / 100;
    const shipping = (subtotal * 0.15) / 100;

    // Calculate final total amount
    const totalAmount = subtotal + tax + shipping;

    if (isNaN(totalAmount) || totalAmount < 0) {
      throw new Error("Total amount calculation error");
    }

    const newOrder = new Order({
      userId,
      products: orderProducts.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      totalAmount,
      paymentStatus: "complete",
    });
    await newOrder.save();

    await User.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id },
    });

    // Empty the cart after order is created
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { products: [] } },
      { new: true }
    );

    return sendResponse(res, "Order placed successfully", 201, newOrder);
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    next(error);
  }
};

export const getLastOrder = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const order = await Order.find({ userId })
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .sort({ orderDate: -1 })
      .exec();

    if (!order) {
      return sendResponse(res, "No pending orders found", 404, null);
    }

    return sendResponse(res, "Order retrieved successfully", 200, order);
  } catch (error) {
    next(error);
  }
};

export const getCompletedOrders = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const orders = await Order.find({ userId, paymentStatus: "completed" })
      .populate({
        path: "products.productId",
        model: "Product",
      })
      .sort({ orderDate: -1 })
      .exec();

    if (orders.length === 0) {
      return sendResponse(res, "No completed orders found", 404, null);
    }

    return sendResponse(
      res,
      "Completed orders retrieved successfully",
      200,
      orders
    );
  } catch (error) {
    next(error);
  }
};
