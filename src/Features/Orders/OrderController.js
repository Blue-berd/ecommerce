import { sendResponse } from "../../Utils/response.js";
import Cart from "../Cart/CartModel.js";
import Product from "../Products/ProductModel.js";
import User from "../Users/UserModel.js";
import Order from "./OrderModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const { address, pincode, cartItems } = req.body;

    // Debugging: Log the incoming request body
    console.log("Request Body:", req.body);

    if (!cartItems || !Array.isArray(cartItems)) {
      throw new Error("Cart items are missing or not an array");
    }

    const userId = req.session.userId;

    const orderProducts = await Promise.all(
      cartItems.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error(`Product with ID ${productId} not found`);
        return { productId, price: product.price, quantity };
      })
    );

    const totalAmount = orderProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );

    const newOrder = new Order({
      userId,
      products: orderProducts.map(({ productId, quantity }) => ({
        productId,
        quantity,
      })),
      totalAmount,
      paymentStatus: "pending",
      address,
      pincode,
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

export const getOrders = async (req, res, next) => {
  try {
    const userId = req.session.userId;
    const orders = await Order.find({ userId });
    return sendResponse(res, "Orders retrieved successfully", 200, orders);
  } catch (error) {
    next(error);
  }
};
