import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { serverPath } from "../../serverPath";

const HomeCourses = () => {
  const [courses, setCourses] = useState([]);
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${serverPath}/api/course/`);
        setCourses(res.data.slice(0, 4)); // show first 4 courses
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl text-center  font-bold text-orange-600 mb-6">Our Courses</h1>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default HomeCourses;
