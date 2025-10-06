import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Courses from "./Courses";
import AddCourse from "./AddCourse";
import ContactRequests from "./ContactRequests";
import SendResources from "../../components/SendResources";
import SendMeetLinks from "../../components/SendMeetLinks";
import AddVideos from "../../components/AddVideos";
import NewRequests from "./NewRequests"; // ✅ new payment requests component
import ChangeAdmin from "./ChangeAdmin";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/dp/admin/login");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-orange-600 text-white flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6">Admin Dashboard</h2>

          <div className="flex flex-col">
            {/* Existing tabs */}
            <button
              className={`p-4 cursor-pointer text-left hover:bg-orange-700 ${activeTab === "courses" ? "bg-orange-700" : ""
                }`}
              onClick={() => setActiveTab("courses")}
            >
              Courses
            </button>

            <button
              className={`p-4 cursor-pointer text-left hover:bg-orange-700 ${activeTab === "addCourse" ? "bg-orange-700" : ""
                }`}
              onClick={() => setActiveTab("addCourse")}
            >
              Add Course
            </button>

            <button
              className={`p-4 cursor-pointer text-left hover:bg-orange-700 ${activeTab === "contacts" ? "bg-orange-700" : ""
                }`}
              onClick={() => setActiveTab("contacts")}
            >
              Contact Requests
            </button>

            <button
              className={`p-4 cursor-pointer text-left hover:bg-orange-700 ${activeTab === "resources" ? "bg-orange-700" : ""
                }`}
              onClick={() => setActiveTab("resources")}
            >
              Send Resources
            </button>

            <button
              className={`p-4 cursor-pointer text-left hover:bg-orange-700 ${activeTab === "meetlinks" ? "bg-orange-700" : ""
                }`}
              onClick={() => setActiveTab("meetlinks")}
            >
              Send Meet Links
            </button>

            <button
              className={`p-4 cursor-pointer text-left hover:bg-orange-700 ${activeTab === "videos" ? "bg-orange-700" : ""
                }`}
              onClick={() => setActiveTab("videos")}
            >
              Add Videos
            </button>

            {/* ✅ New Payment Requests tab */}
            <button
              className={`p-4 cursor-pointer text-left hover:bg-orange-700 ${activeTab === "newRequests" ? "bg-orange-700" : ""
                }`}
              onClick={() => setActiveTab("newRequests")}
            >
              New Payment Requests
            </button>
          </div>
        </div>

        

        {/* Logout Button */}
        <div className="p-6 flex flex-col justify-center items-center gap-4 ">
        <button
          className={`p-4 m-4  text-center
                  cursor-pointer
                w-full px-4 py-2 bg-secondary text-white font-bold rounded-lg shadow-md  transition

    hover:bg-white hover:text-black ${activeTab === "changeAdmin" ? "bg-orange-700" : ""
            }`}
          onClick={() => setActiveTab("changeAdmin")}
        >
          Change Admin
        </button>
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 bg-white border-1 hover:bg-black hover:text-white border-red-400   text-black cursor-pointer  font-bold rounded-lg shadow-md transition"
          >
            Log Out
          </button>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 bg-orange-50 overflow-y-auto">
        {activeTab === "courses" && <Courses />}
        {activeTab === "addCourse" && <AddCourse />}
        {activeTab === "contacts" && <ContactRequests />}
        {activeTab === "resources" && <SendResources />}
        {activeTab === "meetlinks" && <SendMeetLinks />}
        {activeTab === "videos" && <AddVideos />}
        {activeTab === "newRequests" && <NewRequests />}
        {activeTab === "changeAdmin" && <ChangeAdmin />} {/* New tab */}
      </div>
    </div>
  );
};

export default Dashboard;
