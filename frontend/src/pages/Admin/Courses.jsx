import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverPath } from "../../../serverPath";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    tags: "",
  });

  // 🔹 Fetch courses from API
  const fetchCourses = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/course/`, {
        withCredentials: true,
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // 🔹 Open modal with pre-filled course data
  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || "",
      description: course.description || "",
      price: course.price || "",
      tags: course.tags ? course.tags.join(", ") : "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Save edits — merge changes with existing course
  const saveEdit = async () => {
    try {
      const updated = {
        title: formData.title || editingCourse.title,
        description: formData.description || editingCourse.description,
        price:
          formData.price !== ""
            ? Number(formData.price)
            : editingCourse.price,
        tags:
          formData.tags !== ""
            ? formData.tags.split(",").map((t) => t.trim())
            : editingCourse.tags,
      };

      const res = await axios.patch(
        `${serverPath}/api/course/edit/${editingCourse._id}`,
        updated,
        { withCredentials: true }
      );

      setCourses((prev) =>
        prev.map((c) => (c._id === editingCourse._id ? res.data : c))
      );

      closeModal();
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // 🔹 Delete course
  const deleteCourse = async (id) => {
    try {
      await axios.delete(`${serverPath}/api/course/delete/${id}`, {
        withCredentials: true,
      });
      setCourses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="p-8">



      <h1 className="text-3xl text-center font-bold mb-8 text-orange-600">📚 All Courses</h1>


    
      {courses.length === 0 ? (
        <p className="text-gray-500 text-center">No courses available</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-orange-100 flex flex-col"
            >
              <img
                src={c.thumbnail || "/placeholder.png"}
                alt={c.title || "Course"}
                className="w-full h-44 object-cover"
              />

              <div className="p-5 flex flex-col flex-grow">
                {/* Title */}
                <h3 className="font-bold text-xl mb-2 text-orange-700">
                  {c.title || "Untitled Course"}
                </h3>

                {/* Price */}
                <p className="text-lg font-semibold text-gray-800 mb-3">
                  {c.price ? `NPR ${c.price}` : "Free"}
                </p>

                {/* Description with Read More */}
                <p className="text-sm text-gray-600 mb-3">
                  {expanded === c._id
                    ? c.description || "No description available"
                    : `${(c.description || "No description available").slice(
                        0,
                        80
                      )}${
                        c.description && c.description.length > 80 ? "..." : ""
                      } `}
                  {c.description && c.description.length > 80 && (
                    <button
                      onClick={() => toggleExpand(c._id)}
                      className="text-orange-600 cursor-pointer font-medium hover:underline ml-1"
                    >
                      {expanded === c._id ? "Show Less" : "Read More"}
                    </button>
                  )}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {Array.isArray(c.tags) && c.tags.length > 0 ? (
                    c.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-orange-100 text-orange-700 rounded-full"
                      >
                        {tag}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">No tags</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto flex gap-3">
                  <button
                    onClick={() => openEditModal(c)}
                    className="flex-1 px-3 py-2 cursor-pointer text-sm font-medium bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(c._id)}
                    className="flex-1 cursor-pointer px-3 py-2 text-sm font-medium bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              Edit Course
            </h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Course Title"
                className="border rounded px-3 py-2"
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                rows="4"
                className="border rounded px-3 py-2"
              />
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="border rounded px-3 py-2"
              />
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Tags (comma separated)"
                className="border rounded px-3 py-2"
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
