import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';  // 👈 import ScrollTrigger

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".txt",{
      x:-600,
      duration:1,
      opacity:0,
      scrollTrigger:{
        trigger:".txt",
        scroller:"body"
      }

    })

    gsap.from(".txt1",{
      x:1400,
      duration:1.5,
      opacity:0,
      scrollTrigger:{
        trigger:".txt1",
        scroller:"body"
      }
    })
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-screen h-[180px] flex flex-col justify-center items-center px-6 md:px-20 text-white text-center
                 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
    >
      <h1 className="txt text-2xl md:text-4xl font-extrabold mb-2 md:mb-4 drop-shadow-lg">
        Who We Are?
      </h1>
      <p className="txt1 text-sm md:text-lg max-w-3xl font-medium drop-shadow-md">
        At <span className="font-bold">Durbar Physics</span>, we make learning physics <span className="underline decoration-white decoration-2">simple, engaging, and fun</span>. Our mission is to help students understand concepts clearly, solve problems confidently, and excel in exams.
      </p>
    </div>
  );
};

export default WhoWeAre;
