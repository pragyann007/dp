import { Course } from "../models/course.models.js";
import { Payment } from "../models/Payments.model.js";
import { User } from "../models/user.models.js";
import { sendPaymentMail } from "../utils/sendMail.js";

// User initiates payment after uploading SS on WhatsApp
export const initiatePayment = async (req, res) => {
  try {
    const userId = req.userId; // middleware should set this from auth
    const { courseId, email, amount } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "No course found." });
    }

    const payment = await Payment.create({
      userId,
      courseId,
      email,
      amount,
      status: "PENDING",
      paid: false,
    });

    return res
      .status(201)
      .json({
        message: "Payment initiated. Admin will verify within 24 hours.",
        payment,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in payment",
      error: error.message,
    });
  }
};



export const verifyAndUpdate = async (req, res) => {
  try {
    const { paymentId } = req.params; // admin passes paymentId
    const { status } = req.body; // "PAID" or "UNPAID"

    if (!paymentId) {
      return res.status(400).json({ message: "Payment ID is required" });
    }

    // Determine payment update
    let update = {};
    if (status === "PAID") {
      update = { status: "PAID", paid: true };
    } else {
      update = { status: "UNPAID", paid: false };
    }

    // Update payment
    const updatedPayment = await Payment.findByIdAndUpdate(paymentId, update, { new: true })
      .populate("courseId", "title price");

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    const courseId = updatedPayment.courseId._id;
    const userId = updatedPayment.userId;

    // ✅ 1. Add user to course's students array (avoid duplicates)
    await Course.findByIdAndUpdate(courseId, {
      $addToSet: { students: userId }
    });

    // ✅ 2. Update user's enrolledCourses array with per-course isPaid
    if (status === "PAID") {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { 
          enrolledCourses: { course: courseId, isPaid: true } 
        }
      });
    } else {
      // If marking UNPAID, remove course from enrolledCourses
      await User.findByIdAndUpdate(userId, {
        $pull: { enrolledCourses: { course: courseId } }
      });
    }

    // ✅ 3. Send confirmation email
    await sendPaymentMail(
      updatedPayment.email,
      updatedPayment.courseId?.title || "Unknown Course",
      updatedPayment.courseId?.price || updatedPayment.amount,
      updatedPayment.paid
    );

    return res.status(200).json({
      message: `Payment marked as ${status} successfully.`,
      payment: updatedPayment,
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);
    return res.status(500).json({
      message: "Error updating payment status",
      error: error.message,
    });
  }
};





export const getAll = async (req, res) => {
  try {
    // Fetch all payments with user & course info
    const payments = await Payment.find()
      .populate("userId", "email name")   // get user email & name
      .populate("courseId", "title price"); // get course title & price

    // Filter out payments whose course or user no longer exists
    const validPayments = payments.filter(p => p.courseId && p.userId);

    // Map to nice format
    const formattedPayments = validPayments.map(p => ({
      _id: p._id,
      userId: p.userId._id,
      userName: p.userId.name,
      userEmail: p.userId.email,
      courseId: p.courseId._id,
      courseName: p.courseId.title,
      amount: p.amount,
      status: p.status,
      paid: p.paid,
    }));

    return res.status(200).json({
      success: true,
      message: "Fetched all valid payments",
      payments: formattedPayments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching payments",
      error: error.message,
    });
  }
};



export const myPayments = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(400).json({ message: "User ID missing from request" });
    }

    const payments = await Payment.find({ userId })
      .populate("courseId", "title price")
      .sort({ createdAt: -1 });

    // Always return an array, even if empty
    return res.status(200).json({
      message: "Payments fetched successfully",
      count: payments.length,
      payments: payments || [],
    });

  } catch (error) {
    console.error("Error fetching payments:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

