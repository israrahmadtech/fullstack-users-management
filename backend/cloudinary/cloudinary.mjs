import { v2 as cloudinary } from "cloudinary"
import dotenv from "dotenv";
dotenv.config();

const CLOUD_NAME = process.env.CLOUD_NAME
const CLOUD_API_KEY = process.env.CLOUD_API_KEY
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET
})

export default cloudinary