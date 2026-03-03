import { createClient } from "redis";
import dotenv from "dotenv"

dotenv.config()

const REDIS_CLOUD_URL = process.env.REDIS_CLOUD_URL

const redisClient = createClient({
  url: REDIS_CLOUD_URL,
});

redisClient.on("connect", () => {
  console.log("Redis Connected ✅");
});

redisClient.on("error", (err) => {
  console.log("Redis Error ❌", err);
});

await redisClient.connect();

export default redisClient;