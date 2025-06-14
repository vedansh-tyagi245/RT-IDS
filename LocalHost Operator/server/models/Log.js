// models/Log.js
import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  ip: String,
  method: String,
  path: String,
  timestamp: Date,
});

export const Log = mongoose.model("Log", logSchema);
