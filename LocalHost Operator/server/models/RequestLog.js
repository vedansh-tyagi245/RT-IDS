import mongoose from "mongoose";

const requestLogSchema = new mongoose.Schema({
  ip: { type: String, required: true },
  method: { type: String, required: true },
  path: { type: String, required: true },
  headers: { type: Object, default: {} },
  userAgent: { type: String },
  timestamp: { type: Date, default: Date.now },
}, {
  collection: "requests_log"  // 👈 explicitly use correct name
});

export const RequestLog = mongoose.model("RequestLog", requestLogSchema);
