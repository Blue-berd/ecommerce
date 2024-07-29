// src/middleware/checkRole.js
import { sendError } from "../Utils/response.js";
import { asyncGet } from "../Config/redis.js";

const checkRole = (requiredRole) => async (req, res, next) => {
  try {
    if (req.session.role !== requiredRole) {
      return sendError(res, "Unauthorized access", 403);
    }
    next();
  } catch (error) {
    next(error);
  };
}
export default checkRole;
