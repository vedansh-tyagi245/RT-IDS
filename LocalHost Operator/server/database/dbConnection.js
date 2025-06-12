import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "FoodApp",
    });
    console.log(`Connected to database: ${connection.connection.name}`);
  } catch (err) {
    console.error(`Error connecting to database: ${err.message}`);
    process.exit(1); // Exit the process if the database connection fails
  }
};
