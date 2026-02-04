import express from "express"
import { authRouter } from "./routes/route.mjs"
import dotenv from "dotenv"
import connectDB from "./config/db.mjs"
import cors from "cors";

// env
dotenv.config()
// db
connectDB()

const app = express()
const PORT = process.env.PORT

// cors
const FRONTEND_URL = process.env.FRONTEND_URL;
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(express.json())

app.use('/api/v1/auth', authRouter)

app.listen(PORT, () => {
    console.log("Server is up");
})
