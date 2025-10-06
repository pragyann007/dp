import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverPath } from "../../../serverPath";

const GetResources = ({ courseId }) => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseId) return;

    const fetchResources = async () => {
      try {
        const res = await axios.get(`${serverPath}/api/paiduser/get-resources`, {
          withCredentials: true,
        });

        const course = res.data.courses.find(c => c.courseId === courseId);
        setResources(course?.materials || []);
      } catch (err) {
        console.error("Error fetching resources:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [courseId]);

  if (!courseId) return <p className="text-orange-600 font-medium">Select a course to see resources</p>;
  if (loading) return <p className="text-orange-600 font-medium">Loading resources...</p>;
  if (resources.length === 0) return <p className="text-orange-600 font-medium">No resources available for this course</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {resources.map((res, idx) => (
        <div
          key={idx}
          className="bg-white shadow-lg rounded-xl p-5 flex flex-col justify-between hover:shadow-2xl transition duration-300"
        >
          <h3 className="text-orange-700 font-bold text-lg mb-3">{res.title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {res.description || "Download this resource to get started."}
          </p>
          <a
            href={res.fileUrl}
            target="_blank"
            className="mt-auto px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 text-center transition"
          >
            Download
          </a>
        </div>
      ))}
    </div>
  );
};

export default GetResources;
