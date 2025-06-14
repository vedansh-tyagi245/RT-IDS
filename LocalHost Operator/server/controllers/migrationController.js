import mongoose from "mongoose";
import { localDb } from "../database/dbConnection.js";

export const migrateOldData = async (req, res, next) => {
  try {
    const twoMinutesAgo = new Date(Date.now() - 1.2 * 60 * 1000);

    const collections = [
      { name: "logs" },
      { name: "requests_log" },
    ];

    for (const { name } of collections) {
      const atlasCollection = mongoose.connection.collection(name);
      const localCollection = localDb.collection(name);

      // Get all docs and manually filter by timestamp
      const allDocs = await atlasCollection.find().toArray();

      const oldDocs = allDocs.filter(doc => {
        try {
          return doc.timestamp && new Date(doc.timestamp) <= twoMinutesAgo;
        } catch {
          return false;
        }
      });

      if (oldDocs.length) {
        await localCollection.insertMany(oldDocs);
        const ids = oldDocs.map(doc => doc._id);
        await atlasCollection.deleteMany({ _id: { $in: ids } });
        console.log(`✅ Migrated ${oldDocs.length} docs from '${name}'`);
      } else {
        console.log(`ℹ️ No old documents to migrate from '${name}'`);
      }
    }

    res.status(200).json({ success: true, message: "Migration complete" });
  } catch (err) {
    console.error("❌ Migration Error:", err);
    next(err);
  }
};
