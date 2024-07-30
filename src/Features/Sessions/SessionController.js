import { sendResponse } from "../../Utils/response.js";
import Session from "./SessionModel.js";
export const getAllSessions = async (req, res, next) => {
  try {
    // Fetch all sessions from MongoDB
    const sessions = await Session.find({ logoutTime: { $exists: false } });

    const formattedSessions = sessions.map((session) => ({
      userId: session.userId,
      sessionId: session.sessionId,
      loginTime: session.loginTime,
      logoutTime: session.logoutTime, // This will be null for active sessions
      ipAddress: session.ipAddress,
    }));

    return sendResponse(
      res,
      "Active sessions retrieved successfully",
      200,
      formattedSessions
    );
  } catch (error) {
    next(error);
  }
};
