import React, { use } from 'react'
import Nav from '../components/Nav'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { Timeline } from 'gsap/gsap-core'
import Features from '../components/Features'
import Counter from '../components/Counter'
import Testimonials from '../components/Testimonials'
import WhoWeare from '../components/WhoWeare'
import ContactForm from '../components/Contact'
import Layout from './layout'
import HomeCourses from '../components/HomeCourses'
import { useNavigate } from 'react-router-dom'
import hero from "../assets/hero.jpg"

const Home = () => {

  const navigate = useNavigate()

  useGSAP(()=>{
    const tl1 = gsap.timeline();
    const tl = gsap.timeline();

    const tm = gsap.timeline()
    tl1.from(".h1",{
      x:-200,
      duration:1
    })

    tl1.from(".h",{
      x:-290,
      duration:0.75,
      opacity:0
    })
    
    tl.from(".img",{
      x:400,
      duration:1,
      opacity:0
    })

  

    tl1.from(".p",{
      y:100,
      opacity:0,
      duration:0.5

    })

   

    tl1.from(".btn",{
      x:300,
      duration:0.35,
      opacity:0

    })

 

   

  })
  return (
    <Layout>
      <div className=''>
        
      <Nav />
      <div className="w-full h-screen flex flex-col md:flex-row p-4 md:p-18">

        {/* Left Section */}
        <div className="left w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center mt-10 md:mt-[-220px]">
          
          {/* Small top label */}
          <h5  className="h1 text-gray-500 text-sm uppercase tracking-wider mb-2">
            DURBAR PHYSICS
          </h5>

          {/* Main heading with highlight span */}
          <h1  className=" h text-gray-900 text-4xl md:text-6xl font-extrabold leading-snug md:leading-tight mb-6">
            Nepal's <span className="text-orange-500">Premier Institute</span> for Online Learning
          </h1>

          {/* Subheading / paragraph */}
          <p className="p text-gray-600 text-base md:text-lg mb-6">
            Unlock your potential with expert-led courses, interactive lessons, and a learning experience designed to help you excel in Physics.  
            Join thousands of students achieving their dreams, one lesson at a time.
          </p>

          {/* CTA Buttons */}
          <div className='flex btn flex-col sm:flex-row gap-4 mt-6'>
            <button
            onClick={()=>navigate("/courses")}
            className=' w-full sm:w-[180px] cursor-pointer bg-primary hover:bg-hover-color transition-all text-xl text-white p-4 rounded-2xl'>
              Buy Course
            </button>
            <button 
            onClick={()=>navigate("/contact")}
            className=' w-full sm:w-[180px] cursor-pointer border border-secondary text-xl hover:bg-secondary hover:text-white transition-colors text-secondary p-4 rounded-2xl'>
              Contact Us
            </button>
          </div>

        </div>

        {/* Right Section */}
        <div className="right img  w-full md:w-[45%] h-64 md:h-[700px] rounded-2xl mt-8 md:mt-0">
          {/* Replace with your hero image */}
          <img
  className="w-full h-full object-cover object-center rounded-2xl shadow-lg border border-orange-200"
  src={hero}
  alt="Hero"
/>
        </div>

      </div>
      <Counter />
      <Features/>
      <WhoWeare/>
      <HomeCourses/>
      <Testimonials/>
      <ContactForm/>
    </div>
    </Layout>
  )
}

export default Home
