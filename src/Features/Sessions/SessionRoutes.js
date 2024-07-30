import express from "express";
import authMiddleware from "../../Middlewares/authMiddleware.js";
import checkRole from "../../Middlewares/checkRole.js";
import { getAllSessions } from "./SessionController.js";

const sessionRouter = express.Router();

sessionRouter.get("/", authMiddleware, checkRole("admin"), getAllSessions);

export default sessionRouter;
