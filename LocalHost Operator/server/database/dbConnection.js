import mongoose from "mongoose";
import { MongoClient } from "mongodb";

export let localDb;

export const dbConnection = async () => {
  try {
    // Atlas Connection
    const atlas = await mongoose.connect(process.env.MONGO_URI_ATLAS, {
      dbName: "RT_IDS_DB",
    });
    console.log(`✅ Connected to MongoDB Atlas: ${atlas.connection.name}`);

    // Local Compass Connection
    const client = new MongoClient(process.env.MONGO_URI_LOCAL);
    await client.connect();
    localDb = client.db("RT_IDS_LOCAL");
    console.log(`✅ Connected to Local MongoDB Compass`);

  } catch (err) {
    console.error(`❌ DB Connection Error: ${err.message}`);
    process.exit(1);
  }
};
