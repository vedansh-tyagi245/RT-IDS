import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import { localDb } from "../database/dbConnection.js";

const startWebSocket = () => {
    const wss = new WebSocketServer({ port: 8080 });

    wss.on("connection", (ws) => {
        console.log("📡 Client connected to WebSocket");

        ws.send("🛡 Connected to RT-IDS WebSocket. Transferring data every 60s.");

        setInterval(async () => {
            try {
                const res = await fetch("http://localhost:5000/api/migrate");
                const data = await res.json();

                console.log("🛰 Migration status:", data);
                ws.send("📦 " + data.message);
            } catch (err) {
                console.error("❌ Error calling /api/migrate:", err.message);
                ws.send("❌ Migration failed: " + err.message);
            }
        }, 10 * 1000); // every 60 seconds


    });

    console.log("✅ WebSocket server running at ws://localhost:8080");
};

export default startWebSocket;
