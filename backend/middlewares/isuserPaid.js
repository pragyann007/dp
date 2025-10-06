import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const isUserPaid = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) return res.status(401).json({ message: "Token invalid" });

    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if user has **any paid course**
    const hasPaidCourse = user.enrolledCourses.some((c) => c.isPaid);

    if (!hasPaidCourse) {
      req.isPaid = false ;
      return res.status(403).json({ message: "Access denied. Payment required." });
    }

    req.userId = userId;
    req.isPaid = true ; 

    next();
  } catch (error) {
    console.error("isUserPaid error:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

