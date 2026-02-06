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
app.use(cors({
    // origin: "https://fullstack-users-management-frontend.vercel.app",
    origin: "http://localhost:5173",
    credentials: true
}));

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', authMiddleware, usersRoute)

// test route
// app.get("/", (req, res) => {
//   res.json({ message: "Backend is running on Vercel 🚀" });
// });

// export default app

app.listen(4000, () => console.log("Server up.."))