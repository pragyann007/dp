import { Course } from "../models/course.models.js";
import { User } from "../models/user.models.js";

// Get currently paid user info
export const paiduser = async (req, res) => {
  try {
    const isPaid = req.isPaid;
    const userId = req.userId;
    // Fetch user with enrolled courses
    const user = await User.findById(userId)
      .populate("enrolledCourses.course", "title thumbnail price");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user,
      isPaid,
    });
  } catch (error) {
    console.error("Error fetching paid user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get all resources for the user
export const getResources = async (req, res) => {
  try {
    const { isPaid, userId } = req;

    if (!isPaid) {
      return res.status(403).json({ message: "User has not paid." });
    }

    const user = await User.findById(userId).populate(
      "enrolledCourses.course",
      "title materials"
    );

    if (!user || !user.enrolledCourses.length) {
      return res.status(404).json({ message: "No enrolled courses found." });
    }

    // Only include courses where user has paid
    const courseResources = user.enrolledCourses
      .filter((ec) => ec.isPaid && ec.course) // course exists & paid
      .map((ec) => ({
        courseId: ec.course._id,
        title: ec.course.title,
        materials: ec.course.materials || [],
      }));

    return res.status(200).json({ courses: courseResources });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

// Get all videos for the user
export const getVideos = async (req, res) => {
  try {
    const { isPaid, userId } = req;

    if (!isPaid) {
      return res.status(403).json({ message: "User has not paid." });
    }

    const user = await User.findById(userId).populate(
      "enrolledCourses.course",
      "title videos"
    );

    if (!user || !user.enrolledCourses.length) {
      return res.status(404).json({ message: "No enrolled courses found." });
    }

    // Only include courses where user has paid
    const courseVideos = user.enrolledCourses
      .filter((ec) => ec.isPaid && ec.course)
      .map((ec) => ({
        courseId: ec.course._id,
        title: ec.course.title,
        videos: ec.course.videos || [],
      }));

    return res.status(200).json({ courses: courseVideos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
