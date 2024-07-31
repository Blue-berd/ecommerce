import { sendResponse } from "../../Utils/response.js";
import Product from "../Products/ProductModel.js";
import Order from "./OrderModel.js";

import User from "../Users/UserModel.js"; 
export const createOrder = async (req, res, next) => {
  try {
    const { address, pincode, cartItems } = req.body;
    const userId = req.session.userId;

    const orderProducts = await Promise.all(
      cartItems.map(async ({ productId }) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error(`Product with ID ${productId} not found`);
        return { productId, price: product.price };
      })
    );

    const totalAmount = orderProducts.reduce(
      (total, product) => total + product.price,
      0
    );

    const newOrder = new Order({
      userId,
      products: orderProducts.map(({ productId }) => ({
        productId,
        quantity: 1, 
      })),
      totalAmount,
      paymentStatus: "pending",
    });
    await newOrder.save();

    await User.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id },
      $set:{address, pincode}
    });

    return sendResponse(res, "Order placed successfully", 201, newOrder);
  } catch (error) {
    next(error);
  }
};

export const getOrders = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const orders = await Order.find({ userId });
    return sendResponse(res, "Orders retrieved successfully", 200, orders);
  } catch (error) {
    next(error);
  }
};
