import express from "express";
import { getAllLogs } from "../controllers/logController.js";

const router = express.Router();

// GET /api/logs - Fetch all logs
router.get("/", getAllLogs);

export default router;
