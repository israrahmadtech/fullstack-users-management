import User from "../models/User.mjs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export async function loginUser(req, res) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET
        
        const { identifier, password } = req.body

        // validate data
        if (!identifier) return res.status(400).json({ isSuccess: false, message: "Email or username is required" })
        if (!password) return res.status(400).json({ isSuccess: false, message: "Password is required" })

        // User exists or not
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        })
        if (!user) return res.status(404).json({ isSuccess: false, message: "User not found" })

        // Compare password with hashed password using bcrypt
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ isSuccess: false, message: "Invalid credentials" })

        const payload = { id: user._id, name: user.name, email: user.email, username: user.username }
        // Create jwt token
        const token = jwt.sign(
            payload, JWT_SECRET, { expiresIn: "7d" }
        )

        // Response
        res.status(200).json({
            isSuccess: true, message: "Login Successfully", token,
            user: payload
        })
    }
    catch (error) {
        res.status(500).json({isSuccess: false, message: "Internal server error"})
    }
}