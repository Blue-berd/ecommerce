/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Retrieve all user sessions
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: A list of user sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   userId:
 *                     type: string
 *                   role:
 *                     type: string
 *                   loginTime:
 *                     type: string
 *                     format: date-time
 *       403:
 *         description: Unauthorized access
 */
