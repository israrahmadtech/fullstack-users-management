import jwt from "jsonwebtoken"

export async function authMiddleware(req, res, next) {
    try {
        const JWT_SECRET = process.env.JWT_SECRET

        const authHeader = req.headers.authorization

        // check token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ isSuccess: false, message: "Token missing" })
        }

        // extract token
        const token = authHeader.split(" ")[1]

        // verify token
        const decodedToken = jwt.verify(token, JWT_SECRET)

        req.user = decodedToken
        next()
    }
    catch (error) {
        res.status(401).json({ isSuccess: false, message: "Invalid or expired token" })
    }
}