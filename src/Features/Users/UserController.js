import bcrypt from "bcrypt";
import { asyncSetWithExpiry } from "../../Config/redis.js";
import supabase from "../../Config/supabase.js";
import { generateSessionId } from "../../Utils/generateSessionId.js";
import { sendError, sendResponse } from "../../Utils/response.js";
import Session from "../Sessions/SessionModel.js";
import User from "./UserModel.js";

export const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    // Fetch user from MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, "User not found", 400);
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, "Invalid password", 400);
    }

    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (signInError) {
      return sendError(res, "Supabase authentication failed", 400);
    }

    const accessToken = signInData.session.access_token;

    const sessionId = await generateSessionId();
    const sessionData = {
      userId: user._id,
      role: user.role,
      loginTime: new Date(),
      ipAddress: req.ip,
      accessToken,
    };

    // Store session data in Redis
    await asyncSetWithExpiry(
      sessionId,
      JSON.stringify(sessionData),
      process.env.SESSION_EXPIRATION
    );

    await Session.create({
      userId: user._id,
      sessionId,
      loginTime: new Date(),
      ipAddress: req.ip,
    });

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
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      supabaseId,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    return sendResponse(res, "User registered successfully", 201, null, null);
  } catch (error) {
    next(error);
  }
};
