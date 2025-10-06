import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverPath } from "../../serverPath"; // adjust path

const AddVideos = () => {
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch courses dynamically from backend
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/course/`);
      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !videoUrl || !selectedCourse) return;

    // Check if any students are enrolled
    if (!selectedCourse.students || selectedCourse.students.length === 0) {
      toast.warn("No students enrolled in this course ❌");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${serverPath}/api/course/send-video`,
        {
          title,
          url: videoUrl,
          courseId: selectedCourse._id,
        },
        { withCredentials: true }
      );

      toast.success(`Video added and ${selectedCourse.students.length} students notified ✅`);

      // Reset form
      setTitle("");
      setVideoUrl("");
      setSelectedCourse(null);

    } catch (error) {
      console.error(error);
      const message =
        error.response?.data?.message || "Something went wrong!";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-orange-200 mt-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        🎬 Add Video Lecture
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Video Title</label>
          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Course Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Course</label>
          <select
            value={selectedCourse?._id || ""}
            onChange={(e) =>
              setSelectedCourse(
                courses.find((c) => c._id === e.target.value)
              )
            }
            className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:ring-2 focus:ring-orange-400 outline-none"
            required
          >
            <option value="">-- Select a course --</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title} ({course.students?.length || 0} students)
              </option>
            ))}
          </select>
        </div>

        {/* Video Link */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">YouTube Video Link</label>
          <input
            type="url"
            placeholder="Paste YouTube unlisted video link"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Button */}
        <button
          type="submit"
          className={`w-full bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer hover:bg-orange-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Add Video 🚀"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default AddVideos;
