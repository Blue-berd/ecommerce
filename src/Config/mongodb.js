import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const url = process.env.MONGODB_URI;

let client;

export const connectToMongoDB = async () => {
  try {
    client = await MongoClient.connect(url);
    console.log("Connected to MongoDB using native driver!");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

export const getDB = () => {
  if (!client) {
    throw new Error("You must connect to MongoDB first!");
  }
  return client.db();
};
