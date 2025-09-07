import { config } from "dotenv";

config({ path: ".env.local" });

export const { MONGO_DB_CONNECTION_STRING } = process.env;
