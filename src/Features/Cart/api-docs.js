/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - products
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the product in the cart.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product in the cart.
 *     CartItem:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           format: uuid
 *           description: The ID of the product.
 *         quantity:
 *           type: number
 *           description: The quantity of the product in the cart.
 *         product:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: The name of the product.
 *             description:
 *               type: string
 *               description: A brief description of the product.
 *             price:
 *               type: number
 *               format: float
 *               description: The price of the product.
 *             stockQuantity:
 *               type: number
 *               description: The available stock quantity of the product.
 *   parameters:
 *     CartIdParam:
 *       in: path
 *       name: cartId
 *       required: true
 *       description: The ID of the cart to retrieve or modify.
 *       schema:
 *         type: string
 *         format: uuid
 *   responses:
 *     CartNotFound:
 *       description: Cart not found.
 *     Unauthorized:
 *       description: Unauthorized access.
 *     BadRequest:
 *       description: Bad request, invalid input data.
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add product to cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - productId
 *               - quantity
 *             properties:
 *               productId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the product to add to the cart.
 *               quantity:
 *                 type: number
 *                 description: The quantity of the product to add to the cart.
 *     responses:
 *       200:
 *         description: Product added to cart successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Get cart items
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cart retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CartItem'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
