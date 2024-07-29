import bcrypt from "bcrypt";
import supabase from "../../Config/supabase.js";
import { generateSessionId } from "../../Utils/generateSessionId.js";
import { sendError, sendResponse } from "../../Utils/response.js";
import User from "./UserModel.js";
import { asyncSetWithExpiry } from "../../Config/redis.js";
import Session from "../Sessions/SessionModel.js";


export const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    let { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) return sendError(res, error.message, 400);

    const sessionId = await generateSessionId();
    const sessionData = {
      userId: data.user.id,
      role: data.user.role,
      loginTime: new Date(),
      ipAddress: req.ip
    };

    await asyncSetWithExpiry(sessionId, JSON.stringify(sessionData), process.env.SESSION_EXPIRATION);
    await Session.create({ userId: data.user.id, sessionId, loginTime: new Date(), ipAddress: req.ip });

    return sendResponse(res, "Login successful", 201, null, sessionId);
  } catch (error) {
    next(error);
  }
};

export const register = async function (req, res, next) {
  const { email, password, role = "user", phone } = req.body;
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) throw error;

    const supabaseId = data.user.id;

    await User.create({ supabaseId, email, password, role, phone });

    return sendResponse(res, "User registered successfully", 201, null, null);
  } catch (error) {
    if (data && data.user) {
      await supabase.auth.api.deleteUser(data.user.id);
    }

    next(error);
  }
};

