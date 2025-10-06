import React, { useState } from "react";
import contact from "../assets/contact.jpg";

import { ScrollTrigger } from 'gsap/ScrollTrigger';  // 👈 import ScrollTrigger
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { serverPath } from "../../serverPath";
import { toast } from "react-toastify";

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    grade: "",
    age: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("Form submitted:", formData);
  
      const {name,email,phone,grade,age,message} = formData ;
  
      const res = await axios.post(`${serverPath}/api/contact/`,{
        name,email,phone,grade,age,message
  
      },{withCredentials:true});
  
      if (res.status != 200){
  
        toast.error("Something went wrong ")
  
      }
  
      toast.success("Form submited sucessfully !")
  
      // Clear all fields
      setFormData({
        name: "",
        email: "",
        phone: "",
        grade: "",
        age: "",
        message: "",
      });
    } catch (error) {

      const serverMessage = error.response?.data?.message;
            const mongooseMessage =
              error.response?.data?.error?.message || 
              error.response?.data?.error?.errors?.[Object.keys(error.response?.data?.error?.errors || {})[0]]?.message;
            const axiosMessage = error.message;
        
            const finalMessage = serverMessage || mongooseMessage || axiosMessage || "Something went wrong";
            toast.error(`Could not login: ${finalMessage}`);
            console.log("Full error:", error);
      
    }
  };

  useGSAP(()=>{
    const tl = gsap.timeline();

    gsap.from(".form",{
      x:-500,
      opacity:0,
      duration:1.3,
      scrollTrigger:{
        trigger:".form",
        scroller:"body"
      }
    })

    gsap.from(".formimg",{
      x:700,
      opacity:0,
      duration:1,
      scrollTrigger:{
        trigger:".formimg",
        scroller:"body"
      }
    })

    gsap.from(".text",{
      y:400,
      opacity:0,
      duration:0.7,
      scrollTrigger:{
        trigger:".text",
        scroller:"body"
      }
    })

  })

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-16 py-20 bg-orange-50">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-4xl text  md:text-5xl font-extrabold text-orange-600 drop-shadow-sm">
          Reach Out to Us
        </h2>
        <p className="mt-4 text  text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
          Have a question, need help, or just want to say hello?  
          We’d love to hear from you! Fill out the form below and our team will
          get back to you soon.
        </p>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl">
        {/* Left Form Section */}
        <div className="w-full md:w-1/2 form  bg-white shadow-2xl rounded-3xl p-10 md:p-14">
          <h3  className="text-2xl text  md:text-3xl font-bold text-gray-800 mb-8">
            Send us a Message
          </h3>
          <form  onSubmit={handleSubmit} className="space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="p-4 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="p-4 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="p-4 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
              <input
                type="text"
                name="grade"
                placeholder="Grade"
                value={formData.grade}
                onChange={handleChange}
                className="p-4 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
              />
            </div>

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="p-4 border rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="p-4 border rounded-xl w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            ></textarea>

            <button
              type="submit"
              className="w-full cursor-pointer py-4 text-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transform transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Image Section */}
        <div className="w-full formimg md:w-1/2 flex justify-center items-center mt-12 md:mt-0 md:ml-14">
          <div className="w-full h-80 md:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={contact}
              alt="Contact Illustration"
              className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
