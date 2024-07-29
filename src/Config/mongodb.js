import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose"

export const mongooseConnection = async function () {
  const uri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(uri);
    const db = mongoose.connection.db;
    // const collections = await db.listCollections().toArray();

    // console.log("Collections:");
    // for (const collection of collections) {
    //   await db.collection(collection.name).reIndex();
    // }
    console.log('Connected to MongoDB using Mongoose');
  } catch (err) {
    console.error('Failed to connect to MongoDB using Mongoose', err);
    throw err;
  }
}

