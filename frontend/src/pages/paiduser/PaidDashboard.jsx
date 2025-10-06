import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverPath } from "../../../serverPath";
import GetResources from "./GetResources";
import GetVideos from "./GetVideo";

const PaidUserDashboard = () => {
  const [activeTab, setActiveTab] = useState("courses"); // courses | resources | videos
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get(`${serverPath}/api/paiduser`, {
          withCredentials: true,
        });
        setEnrolledCourses(res.data.user?.enrolledCourses || []);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      }
    };
    fetchEnrolledCourses();
  }, []);

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setSelectedCourseId(null); // reset selected course on tab change
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-orange-600 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6 cursor-pointer">My Dashboard</h2>
          <div className="flex flex-col">
            <button
              className={`p-4 text-left cursor-pointer hover:bg-orange-700 ${
                activeTab === "courses" ? "bg-orange-700" : ""
              }`}
              onClick={() => handleTabSwitch("courses")}
            >
              Enrolled Courses
            </button>
            <button
              className={`p-4 text-left cursor-pointer hover:bg-orange-700 ${
                activeTab === "resources" ? "bg-orange-700" : ""
              }`}
              onClick={() => handleTabSwitch("resources")}
            >
              Resources
            </button>
            {activeTab === "resources" && (
              <ul className="pl-6">
                {enrolledCourses.map((course) => (
                  <li
                    key={course.course._id}
                    className={`py-1 cursor-pointer hover:text-orange-200 ${
                      selectedCourseId === course.course._id ? "text-orange-200" : ""
                    }`}
                    onClick={() => setSelectedCourseId(course.course._id)}
                  >
                    {course.course.title}
                  </li>
                ))}
              </ul>
            )}
            <button
              className={`p-4 text-left cursor-pointer hover:bg-orange-700 ${
                activeTab === "videos" ? "bg-orange-700" : ""
              }`}
              onClick={() => handleTabSwitch("videos")}
            >
              Videos
            </button>
            {activeTab === "videos" && (
              <ul className="pl-6">
                {enrolledCourses.map((course) => (
                  <li
                    key={course.course._id}
                    className={`py-1 cursor-pointer hover:text-orange-200 ${
                      selectedCourseId === course.course._id ? "text-orange-200" : ""
                    }`}
                    onClick={() => setSelectedCourseId(course.course._id)}
                  >
                    {course.course.title}
                  </li>
                ))}
              </ul>
            )}

<button   className="w-full mt-150 px-4 py-2 bg-secondary hover:bg-green-500 text-white font-bold rounded-lg shadow-md m-0 cursor-pointer transition"
 >Back to home {">"}</button> 
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-orange-50 overflow-y-auto">
        {/* Courses Tab */}
        {activeTab === "courses" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-orange-700">Your Enrolled Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course) => (
                <div
                  key={course.course._id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition flex flex-col cursor-pointer"
                  onClick={() => setSelectedCourseId(course.course._id)}
                >
                  {course.course.thumbnail && (
                    <img
                      src={course.course.thumbnail}
                      alt={course.course.title}
                      className="w-full h-48 object-cover object-center"
                    />
                  )}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">{course.course.title}</h3>
                    <p className="text-gray-600 mb-4">
                      Price: <span className="font-bold">₹{course.course.price}</span>
                    </p>
                    <button className="mt-auto px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === "resources" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-orange-700">Resources</h2>
            {!selectedCourseId && <p>Select a course to see its resources</p>}
            {selectedCourseId && <GetResources courseId={selectedCourseId} />}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === "videos" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-orange-700">Videos</h2>
            {!selectedCourseId && <p>Select a course to see its videos</p>}
            {selectedCourseId && <GetVideos courseId={selectedCourseId} />}

            
          </div>
        )}

    
      </div>
    </div>
  );
};

export default PaidUserDashboard;
