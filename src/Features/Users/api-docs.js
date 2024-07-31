/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Login successful"
 *         sessionId:
 *           type: string
 *           example: "your-jwt-token-here"
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "user-id"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *     UserRegister:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - role
 *       properties:
 *         email:
 *           type: string
 *           example: "user@example.com"
 *         password:
 *           type: string
 *           example: "password123"
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: "user, admin"
 *         phone:
 *           type: string
 *           example: "+1234567890"
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *           examples:
 *             example1:
 *               summary: Example login request
 *               value:
 *                 email: "user@example.com"
 *                 password: "password123"
 *     responses:
 *       201:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             examples:
 *               example1:
 *                 summary: A successful login response
 *                 value:
 *                   message: "Login successful"
 *                   sessionId: "your-jwt-token-here"
 *                   data:
 *                     user:
 *                       id: "user-id"
 *                       email: "user@example.com"
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *           examples:
 *             example1:
 *               summary: Example registration request
 *               value:
 *                 email: "user@example.com"
 *                 password: "password123"
 *                 role: "user"
 *                 phone: "+1234567890"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
