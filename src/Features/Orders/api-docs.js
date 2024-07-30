/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ProductOrder:
 *       type: object
 *       required:
 *         - productId
 *         - quantity
 *       properties:
 *         productId:
 *           type: string
 *           format: uuid
 *           description: The ID of the product being ordered.
 *         quantity:
 *           type: number
 *           description: The quantity of the product being ordered.
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - products
 *         - totalAmount
 *       properties:
 *         userId:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who placed the order.
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductOrder'
 *           description: The list of products included in the order.
 *         totalAmount:
 *           type: number
 *           format: float
 *           description: The total amount for the order.
 *   parameters:
 *     OrderIdParam:
 *       in: path
 *       name: orderId
 *       required: true
 *       description: The ID of the order to retrieve.
 *       schema:
 *         type: string
 *         format: uuid
 *   responses:
 *     OrderNotFound:
 *       description: Order not found.
 *     Unauthorized:
 *       description: Unauthorized access.
 *     BadRequest:
 *       description: Bad request, invalid input data.
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/ProductOrder'
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders for the logged-in user
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
