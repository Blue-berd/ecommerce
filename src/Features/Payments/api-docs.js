/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - orderId
 *         - userId
 *         - amount
 *         - paymentMethod
 *       properties:
 *         orderId:
 *           type: string
 *           description: The ID of the associated order
 *         userId:
 *           type: string
 *           description: The ID of the user making the payment
 *         amount:
 *           type: number
 *           format: float
 *           description: The amount of the payment
 *         paymentMethod:
 *           type: string
 *           enum: [Credit Card, Debit Card, PayPal]
 *           description: The method used for payment
 *         status:
 *           type: string
 *           enum: [Pending, Completed, Failed]
 *           description: The status of the payment
 *           default: Pending
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the payment was created
 */

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
 *             $ref: '#/components/schemas/Payment'
 *           examples:
 *             example1:
 *               summary: Example payment request
 *               value:
 *                 orderId: "605c72ef8d1d3f001f9b1d61"
 *                 userId: "605c72ef8d1d3f001f9b1d62"
 *                 amount: 150.00
 *                 paymentMethod: "Credit Card"
 *     responses:
 *       201:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Order not found
 */
