import express from "express";
import { getAllRequestLogs } from "../controllers/requestLogsController.js";

const router = express.Router();

// GET /api/requestlogs - fetch all request logs
router.get("/", getAllRequestLogs);

export default router;
