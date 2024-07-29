import Payment from '../models/PaymentModel.js';
import Order from '../models/OrderModel.js';
import { sendError, sendResponse } from '../utils/response.js';

export const processPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const userId = req.session.userId;

    const order = await Order.findById(orderId);
    if (!order) return sendError(res, 'Order not found', 404);

    const newPayment = new Payment({
      orderId,
      userId,
      amount: order.totalAmount,
      paymentMethod,
    });

    const savedPayment = await newPayment.save();
    order.status = 'Completed';
    await order.save();

    return sendResponse(res, 'Payment processed successfully', 201, savedPayment);
  } catch (error) {
    next(error);
  }
};
