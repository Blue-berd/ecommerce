// src/middleware/checkRole.js
import { sendError } from "../Utils/response.js";

const checkRole = (requiredRole) => async (req, res, next) => {
  try {
    console.log("session", req.session);
    if (req.session.role !== requiredRole) {
      return sendError(res, "Unauthorized access", 403);
    }
    next();
  } catch (error) {
    next(error);
  }
};
export default checkRole;
