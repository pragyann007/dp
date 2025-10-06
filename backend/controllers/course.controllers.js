import { Course } from "../models/course.models.js";
import { Payment } from "../models/Payments.model.js";
import { User } from "../models/user.models.js";
import cloudinary from "../utils/cloudinary.js";
import { sendMeetLink, sendVideoNotification } from "../utils/sendMail.js";



export const editCourse = async (req, res) => {
  try {
    const { title, description, price, tags, thumbnail } = req.body;
    const courseId = req.params.id;

    if (!courseId) {
      return res.status(400).json({ message: "No course found to edit" });
    }

    // 1️⃣ Fetch the existing course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // 2️⃣ Merge fields: only update the ones provided
    course.title = title !== undefined ? title : course.title;
    course.description =
      description !== undefined ? description : course.description;
    course.price = price !== undefined ? price : course.price;
    course.tags = tags !== undefined ? tags : course.tags;
    course.thumbnail = thumbnail !== undefined ? thumbnail : course.thumbnail;

    // 3️⃣ Save the updated course
    const updatedCourse = await course.save();

    // 4️⃣ Return full updated course
    return res.status(200).json(updatedCourse);
  } catch (error) {
    return res.status(400).json({
      message: "Error updating course",
      error: error.message,
    });
  }
};




export const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    if (!courseId) return res.status(400).json({ message: "No course ID provided" });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const studentIds = course.students;

    // 1️⃣ Remove course from all enrolled users
    if (studentIds.length > 0) {
      await User.updateMany(
        { _id: { $in: studentIds } },
        { $pull: { enrolledCourses: { course: courseId } } }
      );
    }

    // 2️⃣ Delete all payments related to this course
    await Payment.deleteMany({ courseId });

    // 3️⃣ Delete the course itself
    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course, associated payments, and user enrollments deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
};

// backend/controllers/course.controllers.js
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

export const getOneCourse = async (req,res)=>{
try {
    const courseId = req.params.id ;
  
    if(!courseId){
      return res.status(400).json({message:"No course id"})
    }
  
    const course = await Course.findById(courseId)
  
    return res.status(200).json({message:"Course viewed sucess",course})
} catch (error) {

  return res.status(400).json({message:"error whil viewing course"})
  
}
}


export const createCourse = async (req, res) => {
  try {
    const { title, description, price, tags } = req.body;

    if (!title || !description || !price || !tags) {
      return res.status(400).json({ message: "Empty fields .." });
    }
    

    if (!req.files || !req.files.thumbnail) {
      return res.status(400).json({ message: "Please upload thumbnail ..." });
    }

    // Upload thumbnail to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(
      req.files.thumbnail.tempFilePath,
      {
        resource_type: "image",
        folder: "images",
      }
    );

    const newCourse = new Course({
      title,
      description,
      price: Number(price),
      tags: Array.isArray(tags) ? tags : tags.split(","),
      thumbnail: imageUpload.secure_url,
      thumbnail_id: imageUpload.public_id,
    });

    await newCourse.save();

    return res.status(201).json({ message: "New course created ..", newCourse });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// controllers/courseController.js


export const sendResources = async (req, res) => {
  try {
    const { title, courseId } = req.body;  

    if (!title || !req.files?.file) {
      return res.status(400).json({ message: "Title and file are required." });
    }

    const resource = await cloudinary.uploader.upload(
      req.files.file.tempFilePath,
      { resource_type: "raw", folder: "materials" }
    );

    const newMaterial = { title, fileUrl: resource.secure_url, createdAt: new Date() };

    const newCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { materials: { $each: [newMaterial], $position: 0 } } },
      { new: true }
    );

    return res.status(200).json({
      message: "Material uploaded successfully ✅",
      course: newCourse
    });

  } catch (error) {
    console.error("Error uploading material:", error.message);
    return res.status(500).json({ message: "Error uploading material", error: error.message });
  }
};


export const sendMeetLinksController = async (req, res) => {
  try {
    const { title, link, courseId, day } = req.body;
    if (!title || !link || !courseId || !day) {
      return res.status(400).json({ message: "Empty credentials..." });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Get paid students
    const students = await User.find({ 
      "enrolledCourses.course": courseId,
      "enrolledCourses.isPaid": true
    }).select("email");

    if (!students.length) {
      return res.status(400).json({ message: "No paid students enrolled in this course" });
    }

    for (let student of students) {
      await sendMeetLink(student.email, title, link, course.title, day);
    }

    return res.status(200).json({
      message: `Meet link sent to ${students.length} students successfully`
    });

  } catch (error) {
    console.error("Error sending meet links:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};



export const sendVideoLinks = async (req, res) => {
  try {
    const { title, url, courseId } = req.body;
    if (!title || !url || !courseId) {
      return res.status(400).json({ message: "Title, URL, and Course ID are required." });
    }

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $push: { videos: { title, url } } },
      { new: true }
    );

    // Get paid students
    const students = await User.find({ 
      "enrolledCourses.course": courseId,
      "enrolledCourses.isPaid": true
    }).select("email");

    for (let student of students) {
      await sendVideoNotification(student.email, title, course.title);
    }

    return res.status(200).json({
      message: `Video added successfully and emails sent to ${students.length} students.`,
      course: updatedCourse
    });

  } catch (error) {
    console.error("Error adding video:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};




