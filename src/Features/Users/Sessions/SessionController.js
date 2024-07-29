import { asyncGet, asyncKeys } from "../../../Config/redis.js";
import { sendResponse } from "../../../Utils/response.js";

export const getAllSessions = async (req, res, next) => {
  try {
    const keys = await asyncKeys("session:*");
    const sessions = await Promise.all(
      keys.map(async (key) => {
        const sessionData = await asyncGet(key);
        return JSON.parse(sessionData);
      })
    );
    return sendResponse(res, "Sessions retrieved successfully", 200, sessions);
  } catch (error) {
    next(error);
  }
};
