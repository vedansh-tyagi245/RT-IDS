import mongoose from "mongoose";

const blockedIPSchema = new mongoose.Schema({
  ip: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    default: "Suspicious activity",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const BlockedIP = mongoose.model("BlockedIP", blockedIPSchema);
