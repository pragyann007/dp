import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverPath } from "../../serverPath"; 
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendResources = () => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courses, setCourses] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/course/`);
      setCourses(res.data.courses || res.data); // depending on your backend response
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to fetch courses.");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !selectedCourse) {
      toast.error("Please fill all fields and select a file.");
      return;
    }

    // Validate file size (10 MB max)
    const maxSizeMB = 10;
    if (file.size / 1024 / 1024 > maxSizeMB) {
      toast.error(`File too large! Max size is ${maxSizeMB} MB`);
      return;
    }

    const formData = new FormData();
    formData.append("title", title); // must match backend
    formData.append("courseId", selectedCourse);
    formData.append("file", file); // must match backend

    try {
      setIsUploading(true);
      const res = await axios.patch(
        `${serverPath}/api/course/send-resources`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Resource sent to course successfully ✅");
      console.log(res.data);

      // Reset form
      setTitle("");
      setFile(null);
      setSelectedCourse("");
    } catch (err) {
      console.error("Error uploading file:", err);
      toast.error(err.response?.data?.message || "Error uploading file.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-orange-200">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        📘 Send Resource
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Resource Title
          </label>
          <input
            type="text"
            placeholder="Enter resource title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* File Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select File (PDF / JPEG / PNG)
          </label>
          <input
            type="file"
            accept=".pdf,.jpeg,.jpg,.png"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
          {file && (
            <p className="mt-1 text-sm text-gray-600">
              Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        {/* Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Course
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:ring-2 focus:ring-orange-400 outline-none"
            required
          >
            <option value="">-- Select a course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full cursor-pointer font-semibold py-2 rounded-lg shadow-md transition ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-600 text-white hover:bg-orange-700"
          }`}
        >
          {isUploading ? "Sending..." : "Send Resource 🚀"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default SendResources;
