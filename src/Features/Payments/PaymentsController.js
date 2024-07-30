import Order from "../Orders/OrderModel.js";
import { sendError, sendResponse } from "../utils/response.js";
import Payment from "./PaymentModel.js";

export const processPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const userId = req.session.userId;

    // Find the order by ID
    const order = await Order.findById(orderId);
    if (!order) return sendError(res, "Order not found", 404);

    // Create a new payment record
    const newPayment = new Payment({
      orderId,
      userId,
      amount: order.totalAmount,
      paymentMethod,
    });

    // Save the payment record
    const savedPayment = await newPayment.save();

    // Update the order status and payment status
    order.status = "Completed";
    order.paymentStatus = "Paid"; // Update the paymentStatus
    await order.save();

    // Send a response with the saved payment details
    return sendResponse(
      res,
      "Payment processed successfully",
      201,
      savedPayment
    );
  } catch (error) {
    next(error);
  }
};
