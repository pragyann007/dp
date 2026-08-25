import React, { useEffect, useState } from "react";
import Layout from "./layout";
import PageHeader from "../components/PageHeader";

import axios from "axios";
import { serverPath } from "../../serverPath";
import CourseCard from "../components/CourseCard";

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      
      try {
        const res = await axios.get(`${serverPath}/api/course/`);
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  return (
    <Layout>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <PageHeader text="Our Courses" />
        <div>
        <h1 className="flex justify-center text-orange-600 mt-10  text-3xl font0bold " >{courses.length <=0 && <p>No courses are there currently</p>}</h1>


        </div>
       
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Courses;
