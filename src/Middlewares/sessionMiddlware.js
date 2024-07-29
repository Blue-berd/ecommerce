import { asyncGet } from '../Config/redis.js';
import { sendError } from '../Utils/response.js';

const sessionMiddleware = async (req, res, next) => {
  try {
    const sessionId = req.headers['session-id'];
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

export default sessionMiddleware;
