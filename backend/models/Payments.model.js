import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },

    email: { type: String, required: true }, // user email for admin to contact
    amount: { type: Number, required: true }, // amount = course price

    // status of payment
    status: {
      type: String,
      enum: ["PENDING", "PAID", "REJECTED"],
      default: "PENDING",
    },

    // extra fields for admin flow
    paid: { type: Boolean, default: false }, // ✅ easy check for portal access
  },
  { timestamps: true }
);

export const Payment = mongoose.model("Payment", paymentSchema);
