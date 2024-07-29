import dotenv from "dotenv";
import { createClient } from "redis";
dotenv.config();

const redisHost = process.env.REDIS_HOST || "127.0.0.1";
const redisPort = process.env.REDIS_PORT || 6379;
const redisPassword = process.env.REDIS_PASSWORD;

const redisClient = createClient({
  url: `redis://${redisHost}:${redisPort}`,
  password: redisPassword,
  socket: {
    reconnectStrategy: (retries) => Math.min(retries * 100, 3000),
  },
});

redisClient.on("error", (err) => {
  console.error("Redis Client Error", err);
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("end", () => {
  console.log("Redis client disconnected");
});

redisClient.on("reconnecting", (delay, attempt) => {
  console.log(`Reconnecting to Redis: attempt ${attempt}, delay ${delay}`);
});

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Redis client connected successfully");
  } catch (err) {
    console.error("Redis connection error", err);
  }
}

// Wrap Redis commands in async functions
const asyncSet = async (key, value) => await redisClient.set(key, value);
const asyncGet = async (key) => await redisClient.get(key);
const asyncDel = async (key) => await redisClient.del(key);
const asyncSetWithExpiry = async (key, value, expiry) =>
  await redisClient.set(key, value, { EX: expiry });

export { asyncDel, asyncGet, asyncSet, asyncSetWithExpiry };
export default connectRedis;
