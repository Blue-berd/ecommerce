import bcrypt from "bcrypt";
import supabase from "../../Config/supabase.js";
import { generateSessionId } from "../../Utils/generateSessionId.js";
import { sendError, sendResponse } from "../../Utils/response.js";
import User from "./UserModel.js";
export const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    const { session, error } = await supabase.auth.signIn({ email, password });
    if (error) return sendError(res, error.message, 400);

    const sessionId = await generateSessionId();
    const sessionData = {
      userId: session.user.id,
      loginTime: new Date(),
    };

    await asyncSetWithExpiry(
      sessionId,
      JSON.stringify(sessionData),
      process.env.SESSION_EXPIRATION
    );

    return await sendResponse(res, "Login successful", 201, null, sessionId);
  } catch (error) {
    next(error);
  }
};

export const register = async function (req, res, next) {
  const { email, password, role = "user" } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    // Register user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password: hashedPassword,
    });

    if (error) throw error;

    // Save additional user information to MongoDB
    await User.create({ email, password: hashedPassword, role });

    return sendResponse(res, "User registered successfully", 201, null, null);
  } catch (error) {
    next(error);
  }
};
