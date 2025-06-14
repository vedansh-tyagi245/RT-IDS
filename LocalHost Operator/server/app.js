import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middleware/error.js";
import migrateRouter from "./routes/migrate.js";
import requestLogRouter from "./routes/requestLog.js";
import logRouter from "./routes/log.js"; // ✅ Import logs route
import startWebSocket from "./services/websocket.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to both MongoDBs
await dbConnection();

// API Routes
app.use("/api/migrate", migrateRouter);
app.use("/api/requestlogs", requestLogRouter);
app.use("/api/logs", logRouter); // ✅ Add logs route here

// Error Handling Middleware
app.use(errorMiddleware);

// Start WebSocket Server
startWebSocket();

export default app;
