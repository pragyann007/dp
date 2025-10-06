import { User } from "../models/user.models.js"

import bcrypt from "bcryptjs"
import { genToken } from "../utils/genToken.js"


// export const createAdmin = async (req,res)=>{

//   const password = await bcrypt.hash("dpadmin@123",12)
//   const user = await User.create({
//     name:"dp_admin",
//     email:process.env.SUPERADMIN_EMAIL,
//     password,
//     role:"admin"

//   })

//   return res.status(200).json({message:"admin  created sucessfully .",user})

// }



export const changeAdmin = async (req, res) => {
  try {
    // Use query if sending via URL like ?previousemail=...&email=...&password=...
    const { previousemail, email, password } = req.query;

    if (!previousemail || !email || !password) {
      return res.status(400).json({ message: "Empty credentials" });
    }

    const admin = await User.findOne({ email: previousemail });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    admin.email = email;
    admin.password = hashedPassword;
    await admin.save();

    return res.status(200).json({ message: "Admin credentials updated successfully" });
  } catch (error) {
    console.error("Error changing admin:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


// --- Login admin ---


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Empty credentials" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);

    if (!isPassMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = await genToken(user._id, user.role);

    res.cookie("token", token, {
      secure: false, // change to true in production
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({ message: "Admin logged in successfully!" ,user });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const getAdminMe = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ message: "Forbidden" });

    return res.status(200).json({ user: decoded });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};