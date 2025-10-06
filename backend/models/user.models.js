import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, min: 4 },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    phone: { type: Number },

    otp: { type: Number },
    isotpVerified: { type: Boolean, default: false },
    otpExpires: { type: Date },

    // Track enrolled courses with per-course payment status
    enrolledCourses: [
      {
        course: { type: mongoose.Types.ObjectId, ref: "Course" },
        isPaid: { type: Boolean, default: false },
      }
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
