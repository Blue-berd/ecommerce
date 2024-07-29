import { asyncGet } from '../Config/redis.js';
import { sendError } from '../Utils/response.js';

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendError(res, 'Authorization header missing or malformed', 401);
    }

    const sessionId = authHeader.split(" ")[1];
    const sessionData = await asyncGet(sessionId);

    if (!sessionData) {
      return sendError(res, 'Session expired or not found', 403);
    }

    req.session = JSON.parse(sessionData);
    next();
  } catch (err) {
    return sendError(res, 'Session expired or not found', 403);
  }
};

export default authMiddleware;
