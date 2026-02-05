import jwt from "jsonwebtoken"
const JWT_SECRET = process.env.JWT_SECRET || "IsrarAhmadKhanHazratLare"

export async function authMiddleware(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        console.log(authHeader);
        

        // check token exists
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({isSuccess: false, message: "Token missing"})
        }

        // extract token
        const token = authHeader.split(" ")[1]
        console.log(token);
        

        // verify token
        const decodedToken = jwt.verify(token, JWT_SECRET)

        req.user = decodedToken
        next()
    }
    catch (error) {
        res.status(401).json({isSuccess: false, message: "Invalid or expired token"})    
    }
}