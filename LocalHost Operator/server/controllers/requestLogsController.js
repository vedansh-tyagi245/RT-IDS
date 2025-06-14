import { localDb } from "../database/dbConnection.js";

export const getAllRequestLogs = async (req, res, next) => {
  try {
    const logs = await localDb
      .collection("requests_log")
      .find()
      .sort({ timestamp: -1 })
      .toArray();

    console.log("Fetched logs count:", logs.length);
    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching request logs:", error);
    next(error);
  }
};
