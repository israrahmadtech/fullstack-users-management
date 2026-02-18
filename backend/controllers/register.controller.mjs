import bcrypt from "bcryptjs"
import User from "../models/User.mjs"

export async function createUser(req, res) {
    try {
        // Get data from body
        const { name, email, username, password, image } = req.body

        // email or username checking
        if (!email && !username) return res.status(400).json({ isSuccess: false, message: 'Email or Username is required' }) // 400: bad request
        // name and password check
        if (!name || !password || !image) return res.status(400).json({ message: "All fields are required" })

        // Existing user checking
        const existingUser = await User.findOne({ $or: [{ email }, { username }] })

        if (existingUser) return res.status(409).json({ isSuccess: false, message: "User already exists" }) // 409: conflict

        // Hash password
        const hashedPass = await bcrypt.hash(password, 10)

        // validate new user using User schema and create user in mongo db
        const user = await User.create({ name, email, username, password: hashedPass, image })

        // response
        res.status(201).json({
            message: "User successfully created",
            user: { id: user._id, name: user.name, email: user.email, username: user.username, image: user.image }
        })
    }
    catch (error) {
        res.status(500).json({ isSuccess: false, message: "Internal server error" })
    }
}

// FLOW:
/*

Request
  ↓
Controller
  ↓
await User.create()
  ↓
Mongoose Schema Validation
  ↓
MongoDB insertOne
  ↓
MongoDB response
  ↓
user variable filled
  ↓
Response sent to frontend

*/