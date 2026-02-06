import express from "express"
import { authRouter } from "./routes/auth.route.mjs"
import dotenv from "dotenv"
import connectDB from "./config/db.mjs"
import cors from "cors";
import { usersRoute } from "./routes/users.route.mjs";
import { authMiddleware } from "./middlewares/auth.middleware.mjs";

// env
dotenv.config()
// db
connectDB()

const app = express()

app.use(express.json())

// cors
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authMiddleware, usersRoute)

// test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running on Vercel 🚀" });
});

export default app