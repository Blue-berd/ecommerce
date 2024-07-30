/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Retrieve all user sessions
 *     tags: [Sessions]
 *     security:
 *       - BearerAuth: []
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
 *                     description: The ID of the user
 *                   sessionId:
 *                     type: string
 *                     description: The ID of the session
 *                   loginTime:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the user logged in
 *                   logoutTime:
 *                     type: string
 *                     format: date-time
 *                     description: The date and time when the user logged out (optional)
 *                   ipAddress:
 *                     type: string
 *                     description: The IP address from which the user logged in
 *       403:
 *         description: Unauthorized access. Only users with the "admin" role can access this endpoint.
 *       500:
 *         description: Internal server error
 */
