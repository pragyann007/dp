import React from 'react'
import { RiGraduationCapLine } from "react-icons/ri";import { MdOutlinePlayCircle } from "react-icons/md";
import { ImFileText2 } from "react-icons/im";
import { BsBarChartFill } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { TbMessageCircleFilled } from "react-icons/tb";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';  // 👈 import ScrollTrigger

// Register plugin
gsap.registerPlugin(ScrollTrigger);


const Features = () => {

  useGSAP(()=>{
    gsap.from(".features",{
      x:"-700px",
      opacity:0,
      // stagger:true,
      scrollTrigger:{
        trigger:".features",
        scroller:"body",
        
        scrub:true


      }
    })
  })

    const features_info = [
        {
            icon:<RiGraduationCapLine size={"42px"} color='blue' />,
            color:"#F4F7FF",
            title:"Expert-Led Courses",
            desc:"Learn from Nepal’s top Physics educators with years of proven teaching experience."
        },
        {
            icon:<MdOutlinePlayCircle size={"42px"} color='#CE68C8' />,
            color:"#FAF4FF",
            title:"Interactive Video Lessons",
            desc:"Engage with high-quality recorded and live video sessions designed to simplify complex concepts."
        },
        {
            icon:<ImFileText2 size={"42px"} color='red' />,
            color:"#FFF2F2",
            title:"Practice & Mock Tests",
            desc:"Boost your confidence with regular quizzes, assignments, and model exam papers."

        },
        {
            icon:<BsBarChartFill size={"42px"} color='green'  />,
            color:"#E9FBF2",
            title:"Progress Tracking",
            desc:"Track your learning journey, identify weak areas, and improve step by step with personalized reports."

        },
        {
            icon:<LuAlarmClock size={"42px"  } color='white' />,
            color:"black",
            title:"Flexible Learning",
            desc:"Access your courses anytime, anywhere—study at your own pace with full flexibility."
        },
        {
            icon:<TbMessageCircleFilled size={"42px" } color='orange' />,
            color:"#FFF4E5",
            title:"Doubt Clearing Support",
            desc:"Get your doubts resolved instantly with dedicated teacher support and discussion groups."
        }
    ]
  return (
    <div className='p-8 '>

        <div className='flex p-4 shadow-lg  rounded-lg flex-col gap-8 justify-center items-center'>
            
            <h1 className='text-secondary font-bold text-4xl mt-6  ' >Our Features</h1>

            <div className="container mx-auto px-6 py-12 mb-20">
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {features_info.map((item, idx) => (
      <div
        key={idx}
        className="features cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center group"
      >
        {/* Icon */}
        <div
          style={{ background: item.color }}
          className="p-6 w-24 h-24 flex justify-center items-center rounded-full mb-6 group-hover:scale-110 transition-transform duration-300"
        >
          {item.icon}
        </div>

        {/* Title */}
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
          {item.title}
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</div>


        </div>

    </div>
  )
}

export default Features