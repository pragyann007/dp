import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const [showPopup, setShowPopup] = useState(false);

  const handleEnroll = (e) => {
    e.stopPropagation();

    if (user) {
      // User is logged in, proceed to course detail
      navigate(`/courses/${course._id}`);
    } else {
      // User not logged in, show popup
      setShowPopup(true);

      // Automatically redirect to login after 2.5 seconds
      setTimeout(() => {
        setShowPopup(false);
        navigate("/login");
      }, 2500);
    }
  };

  const openCourseDetail = () => {
    navigate(`/courses/${course._id}`);
  };

  return (
    <>
      <div
        onClick={openCourseDetail}
        className="cursor-pointer mt-8 justify-center bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-orange-100 flex flex-col"
      >
        {/* Thumbnail */}
        <img
          src={course.thumbnail || "/placeholder.png"}
          alt={course.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-5 flex flex-col flex-grow">
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 text-orange-700">
            {course.title || "Untitled Course"}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm mb-3 line-clamp-3">
            {course.description || "No description available"}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-3">
            {Array.isArray(course.tags) && course.tags.length > 0 ? (
              course.tags.map((tag, i) => (
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

          {/* Price */}
          <p className="mt-auto text-lg font-semibold text-gray-800">
            {course.price ? `NPR ${course.price}` : "Free"}
          </p>

          {/* Enroll Button */}
          <button
            onClick={handleEnroll}
            className="mt-3 px-4 py-2 cursor-pointer bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition"
          >
            Enroll Now
          </button>
        </div>
      </div>

      {/* Orange-themed popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-orange-500 text-white p-6 rounded-xl shadow-lg max-w-xs text-center animate-fadeIn">
            <h3 className="text-[22px] font-bold mb-2">You must be logged in!</h3>
            <p className="text-lg">
              You cannot enroll in a course without logging in.
            </p>
            <p className="text-lg mt-2">Redirecting to login...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseCard;
