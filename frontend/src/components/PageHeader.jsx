import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import {ScrollTrigger} from "gsap/ScrollTrigger"
import React from 'react'

gsap.registerPlugin(ScrollTrigger)
const PageHeader = ({ text }) => {

    useGSAP(()=>{
        gsap.from(".head",{
            x:-800,
            opacity:0,
            duration:1,
        })
    })
 
  return (
    <div className='w-full head mb-8 '>
      {/* Outer container with padding and responsive margin */}
      <div className='relative mt-20 flex justify-center items-center'>
        
        {/* Banner Box */}
        <div className='w-[90%] md:w-[80%] lg:w-[70%] h-32 md:h-40 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600
                        rounded-3xl shadow-2xl flex flex-col justify-center items-center
                        overflow-hidden'>
          
          {/* Decorative Border Wave */}
          <div className='absolute bottom-0 w-full h-6 bg-white rounded-t-full opacity-30'></div>
          
          {/* Page Text */}
          <h1 className='text-white text-2xl md:text-4xl font-bold drop-shadow-lg'>
            {text}
          </h1>
          <p className='text-orange-100 text-sm md:text-base mt-1'>
            Welcome to the {text} page
          </p>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
