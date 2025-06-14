import { localDb } from "../database/dbConnection.js";

// @desc    Get all logs from the 'logs' collection
// @route   GET /api/logs
// @access  Public
export const getAllLogs = async (req, res, next) => {
  try {
    const logs = await localDb
      .collection("logs")
      .find()
      .sort({ timestamp: -1 })
      .toArray();

    console.log("Fetched logs count:", logs.length);
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error);
    next(error);
  }
};
