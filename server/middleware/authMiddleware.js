import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token should be in the format: "Bearer <token>"
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token provided ❌" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach user info (like id, email, etc.) to the request
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    res.status(403).json({ msg: "Invalid or expired token 🚫" });
  }
};

export default verifyToken;
