import express from "express";
import { migrateOldData } from "../controllers/migrationController.js";

const router = express.Router();

router.get("/", migrateOldData); // Optional: Manual trigger

export default router;
