import express from "express";
import checkRole from "../../Middlewares/checkRole.js";
import { getAllSessions } from "./SessionController.js";

const router = express.Router();

router.get("/", checkRole("admin"), getAllSessions);

export default router;
