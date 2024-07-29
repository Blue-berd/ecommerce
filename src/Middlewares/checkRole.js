// src/middleware/checkRole.js
import { sendError } from "../Utils/response.js";
import { asyncGet } from "../Config/redis.js";

const checkRole = (requiredRole) => async (req, res, next) => {
  const sessionId = req.headers["session-id"];
  if (!sessionId) {
    return sendError(res, "Session ID is missing", 403);
  }

  try {
    const sessionData = await asyncGet(sessionId);
    if (!sessionData) {
      return sendError(res, "Session expired or not found", 403);
    }

    const session = JSON.parse(sessionData);
    if (session.role !== requiredRole) {
      return sendError(res, "Unauthorized access", 403);
    }

    req.session = session;
    next();
  } catch (error) {
    next(error);
  }
};

export default checkRole;
