/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Process a payment through the external payment gateway
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - orderId
 *               - paymentMethod
 *             properties:
 *               orderId:
 *                 type: string
 *               paymentMethod:
 *                 type: string
 *                 enum: [Credit Card, Debit Card, PayPal]
 *     responses:
 *       201:
 *         description: Payment processed
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
