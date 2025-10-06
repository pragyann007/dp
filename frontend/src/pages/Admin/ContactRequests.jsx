import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverPath } from "../../../serverPath";

const ContactRequests = () => {
  const [contacts, setContacts] = useState([]);

  // ✅ Fetch all contact requests
  const fetchContacts = async () => {
    try {
      const res = await axios.get(`${serverPath}/api/contact/`, {
        withCredentials: true,
      });

      if (res.data && Array.isArray(res.data.user)) {
        setContacts(res.data.user);
      } else {
        setContacts([]);
      }
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setContacts([]);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // ✅ Handle Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contact?")) return;

    try {
      await axios.delete(`${serverPath}/api/contact/${id}`, {
        withCredentials: true,
      });

      // Remove from state after deletion
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error("Error deleting contact:", err);
      alert("Failed to delete contact. Try again!");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold mb-6 text-center bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
        Contact Requests
      </h1>
      <ul className="space-y-6">
        {contacts.length > 0 ? (
          contacts.map((c) => (
            <li
              key={c._id}
              className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-orange-200 
                         hover:shadow-2xl hover:scale-[1.02] transform transition-all duration-300"
            >
              <p className="text-lg font-semibold text-gray-800">
                <span className="text-orange-500">Name:</span> {c.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-orange-500">Email:</span> {c.email}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-orange-500">Age:</span> {c.age}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-orange-500">Grade:</span> {c.grade}
              </p>
              <div className="text-gray-700 mb-4">
                <span className="font-medium text-orange-500">Message:</span>
                <p
                  className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200 
                             text-gray-800 text-sm leading-relaxed break-words whitespace-pre-line 
                             max-h-[200px] overflow-y-auto"
                >
                  {c.message}
                </p>
              </div>

              {/* ✅ Delete button */}
              <button
                onClick={() => handleDelete(c._id)}
                className="px-4 cursor-pointer py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center italic">
            No contact requests found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default ContactRequests;
