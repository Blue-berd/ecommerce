import { sendResponse } from "../../Utils/response.js";
import Product from "../Products/ProductModel.js";
import Order from "./OrderModel.js";

export const createOrder = async (req, res, next) => {
  try {
    const { products } = req.body;
    const userId = req.session.userId;

    const orderProducts = await Promise.all(
      products.map(async ({ productId, quantity }) => {
        const product = await Product.findById(productId);
        if (!product) throw new Error(`Product with ID ${productId} not found`);
        if (product.quantity < quantity) {
          throw new Error(`Product with ID ${productId} quantity not enough.`);
        }
        return { productId, quantity, price: product.price };
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
    });
    await newOrder.save();

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
