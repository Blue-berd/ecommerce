import bcrypt from "bcrypt";
import { asyncSetWithExpiry } from "../../Config/redis.js";
import { sendError, sendResponse } from "../../Utils/response.js";
import User from "./UserModel.js";

export const login = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return sendError(res, "User not found", 400);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return sendError(res, "Invalid password", 400);
    }
    
    const sessionId = Math.random() * 10000000;
    await asyncSetWithExpiry(
      sessionId,
      JSON.stringify(user),
      process.env.SESSION_EXPIRATION
    );

    return sendResponse(res, "Login successful", 201, null, sessionId);
  } catch (error) {
    next(error);
  }
};

export const register = async function (req, res, next) {
  const { email, password, role = "user", phone } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return sendError(res, "User already registered", 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
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
