import jwt from "jsonwebtoken";

export const isAdminAuth = (req, res, next) => {
  try {
    const token = req.cookies.token
    

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, user not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
