import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { serverPath } from "../../../serverPath";

const NewRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");

  // Fetch all payment requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/payment/all`, {
        withCredentials: true,
      });

      // Use `payments` key from backend, fallback to empty array
      setRequests(res.data.payments || []);
    } catch (err) {
      console.error("Error fetching payment requests:", err);
      toast.error("Failed to fetch payment requests.");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle status change locally
  const handleStatusChange = (e, requestId) => {
    setRequests((prev) =>
      prev.map((req) =>
        req._id === requestId ? { ...req, status: e.target.value } : req
      )
    );
  };

  // Update payment status via backend
  const handleUpdate = async (request) => {
    try {
      await axios.patch(
        `${serverPath}/api/payment/verify-payment/${request._id}`,
        { status: request.status },
        { withCredentials: true }
      );

      toast.success(
        `${request.userEmail} payment marked as ${request.status}`
      );

      // Refetch to get fresh data if needed
      fetchRequests();
    } catch (err) {
      console.error("Error updating payment status:", err);
      toast.error("Failed to update payment status.");
    }
  };

  // Filter requests safely
  const filteredRequests = (requests || []).filter((req) => {
    const matchesSearch =
      req.userEmail?.toLowerCase().includes(searchText.toLowerCase()) || false;
    const matchesCourse = selectedCourse
      ? req.courseName === selectedCourse
      : true;
    return matchesSearch && matchesCourse;
  });

  // Get unique course names for buttons
  const courses = [...new Set((requests || []).map((r) => r.courseName))];

  if (loading)
    return (
      <p className="text-center mt-6 text-xl font-semibold">
        Loading requests...
      </p>
    );

  if (!requests.length)
    return (
      <p className="text-center mt-6 text-xl font-semibold">
        No payment requests found!
      </p>
    );

  return (
    <div className="p-8 w-full h-full overflow-auto bg-white">
      <h1 className="text-3xl font-bold text-orange-600 mb-6">
        New Payment Requests
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by user email..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full md:w-1/2 px-4 py-3 mb-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      {/* Course Filter Buttons */}
      <div className="mb-4 flex flex-wrap gap-3">
        <button
          onClick={() => setSelectedCourse("")}
          className={`px-4 py-2 rounded-lg font-semibold ${
            selectedCourse === "" ? "bg-orange-600 text-white" : "bg-gray-200"
          }`}
        >
          All Courses
        </button>
        {courses.map((course) => (
          <button
            key={course}
            onClick={() => setSelectedCourse(course)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              selectedCourse === course
                ? "bg-orange-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {course}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-left text-lg">
          <thead className="bg-orange-100">
            <tr>
              <th className="px-6 py-3 border-b">User Email</th>
              <th className="px-6 py-3 border-b">User Name</th>
              <th className="px-6 py-3 border-b">Course</th>
              <th className="px-6 py-3 border-b">Amount</th>
              <th className="px-6 py-3 border-b">Status</th>
              <th className="px-6 py-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50">
                <td className="px-6 py-3 border-b">{request.userEmail}</td>
                <td className="px-6 py-3 border-b">{request.userName}</td>
                <td className="px-6 py-3 border-b">{request.courseName}</td>
                <td className="px-6 py-3 border-b">NPR {request.amount}</td>
                <td className="px-6 py-3 border-b">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(e, request._id)}
                    className={`${
                      request.status === "PAID"
                        ? "bg-green-500"
                        : "bg-red-400"
                    } px-3 py-2 rounded border cursor-pointer text-white border-gray-300 text-lg`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PAID">PAID</option>
                    <option value="UNPAID">UNPAID</option>
                  </select>
                </td>
                <td className="px-6 py-3 border-b">
                  <button
                    onClick={() => handleUpdate(request)}
                    className="px-4 py-2 text-white font-bold rounded-lg bg-orange-400 cursor-pointer hover:bg-orange-500 transition text-lg"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredRequests.length === 0 && (
          <p className="text-center mt-4 text-lg">No matching requests found.</p>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default NewRequests;
