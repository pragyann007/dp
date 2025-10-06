import React from 'react';
import Nav from '../components/Nav';
import PageHeader from '../components/PageHeader';
import about from "../assets/aboutus.jpg";
import { useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from "gsap/ScrollTrigger"
import Layout from './layout';

gsap.registerPlugin(ScrollTrigger)

const About = () => {

  useGSAP(()=>{
    gsap.from(".left",{
      x:-900,
      opacity:0,
      duration:1,
      scrollTrigger:{
        trigger:".left",
        scroller:"body",
       
      }
    })

    gsap.from(".btn",{
      x:-900,
      opacity:0,
      duration:1,
      scrollTrigger:{
        trigger:".btn",
        scroller:"body",
       
      }
    })

    gsap.from(".img",{
      x:900,
      opacity:0,
      duration:1,
      scrollTrigger:{
        trigger:".img",
        scroller:"body",
       
      }
    })

    gsap.from(".card",{
      x:800,
      opacity:0,
      duration
      :1,
      scrollTrigger:{
        trigger:".card",
        scroller:"body"
      }
    })
  })

  const navigate = useNavigate()
  return (
    <Layout>
       <div className="bg-white text-gray-800 font-sans">
      <Nav />
      <PageHeader text="About Us" />

      <section className="px-6 md:px-20 py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">

          {/* Left Side – Text Section */}
          <div className="w-full left lg:w-1/2 bg-white p-8 rounded-3xl shadow-xl flex mt-22  flex-col ">
            <h5 className="text-orange-600  mt-8 font-semibold text-sm mb-2 uppercase">How It Started</h5>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our Mission is to Make Study Easy and Fun for Every Student
            </h1>

            <p className="text-lg leading-relaxed text-gray-700 mb-6">
              Durbar Physics was founded by a team of passionate educators who believe that learning physics should be accessible, engaging, and effective for every student in Nepal.
              <br /><br />
              Our mission is to simplify complex concepts and help students build a strong foundation while developing confidence in problem-solving. Through interactive lessons, practice tests, and personalized guidance, we aim to transform the way physics is taught and learned across the country.
            </p>

            {/* Orange Contact Us Button */}
            <button
            onClick={()=>navigate("/contact")}
            className="bg-orange-500 btn mt-8  text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition duration-300 w-max cursor-pointer">
              Contact Us
            </button>
          </div>

          {/* Right Side – Image & Stats */}
          <div className="w-full lg:w-1/2 bg-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
            <div className="rounded-xl img overflow-hidden">
              <img src={about} alt="Durbar Physics Team" className="w-full h-auto object-cover rounded-xl" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <StatCard value="10+" label="Years of Teaching" />
              <StatCard value="500+" label="Students Trained" />
              <StatCard value="1000+" label="Practice Questions" />
              <StatCard value="95%" label="Student Satisfaction" />
            </div>
          </div>

        </div>
      </section>
    </div>
    </Layout>
   
  );
};

// Stat Card Component with cursor-pointer
const StatCard = ({ value, label }) => {
  return (
    <div className="card bg-orange-100 p-4 rounded-xl text-center shadow-md hover:scale-105 transition-transform duration-200 cursor-pointer">
      <h3 className="text-2xl font-bold text-orange-600">{value}</h3>
      <p className="text-sm text-gray-700">{label}</p>
    </div>
  );
};

export default About;
