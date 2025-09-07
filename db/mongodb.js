import mongoose from "mongoose";
import { MONGO_DB_CONNECTION_STRING } from "../config.js";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_DB_CONNECTION_STRING);
    console.log(`Connected to database`);
  } catch (error) {
    console.error("Error connection to database. ", error);
  }
};

export default connectToDatabase;
