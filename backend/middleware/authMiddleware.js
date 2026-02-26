import jwt from "jsonwebtoken";

//
const protect = async (req, res, next)=>{
    console.log("Auth middleware called");
    const token = req.headers.authorization; // Get the token from the Authorization header
    if(!token){
        return res.status(401).json({message: "Not authorized, no token"});
    }
    console.log("Token found:");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using the secret key. If the token is valid, it will return the decoded payload, which contains the userId that we included when we generated the token during registration or login.
        req.userId = decoded.userId;
        console.log("Token verified, userId:");
        next();
    } catch (error) {
        return res.status(401).json({message: "Not authorized, token failed"});
    }
}

export default protect;