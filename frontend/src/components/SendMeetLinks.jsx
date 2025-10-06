import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverPath } from "../../serverPath"; // adjust path
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendMeetLinks = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [day, setDay] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Fetch courses from backend
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/course/`, { withCredentials: true });
      setCourses(res.data);
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

    if (!title || !link || !selectedCourse || !day) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${serverPath}/api/course/send-meetlinks`,
        {
          title,
          link,
          courseId: selectedCourse,
          day,
        },
        { withCredentials: true }
      );

      toast.success(res.data.message || "Meet link sent successfully!");

      // Reset form
      setTitle("");
      setLink("");
      setSelectedCourse("");
      setDay("");

    } catch (error) {
      console.error("Error sending meet link:", error);
      toast.error(error.response?.data?.message || "Server error while sending meet link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-6 border border-orange-200 mt-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-6">
        📅 Add Class Meeting Link
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Class Title</label>
          <input
            type="text"
            placeholder="Enter class title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Link */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Meeting Link</label>
          <input
            type="url"
            placeholder="Enter Zoom / Google Meet link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            required
          />
        </div>

        {/* Course Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Course</label>
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

        {/* Day Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Day of Class</label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg cursor-pointer focus:ring-2 focus:ring-orange-400 outline-none"
            required
          >
            <option value="">-- Select a day --</option>
            {days.map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-orange-600 text-white font-semibold py-2 rounded-lg shadow-md cursor-pointer hover:bg-orange-700 transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Sending..." : "Add Meet Link 🚀"}
        </button>
      </form>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default SendMeetLinks;
