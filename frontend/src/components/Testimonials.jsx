import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import gsap from "gsap";

import { ScrollTrigger } from 'gsap/ScrollTrigger';  // 👈 import ScrollTrigger

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Ramesh Thapa",
    role: "Student",
    message: "This platform has transformed my learning experience! Highly recommended.",
  },
  {
    name: "Sita Shrestha",
    role: "Developer",
    message: "Amazing courses and excellent community support. Loved it!",
  },
  {
    name: "Binod Kandel",
    role: "Designer",
    message: "A very helpful platform for learning new skills efficiently.",
  },
  {
    name: "Mina Lama",
    role: "Entrepreneur",
    message: "This resource is a must-have for anyone looking to improve their skills.",
  },
];

const Testimonials = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.from(containerRef.current.children, {
      y: 50,
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".testimonials",{
      x:-1500,
      opacity:0,
      scrollTrigger:{
        trigger:".testimonials",
        scroller:"body"
      }
    })

    gsap.from(".desc",{
      y:700,
      opacity:0,
      scrollTrigger:{
        trigger:".desc",
        scroller:"body"
        
      }
    })
  }, []);

  return (
    <div className="bg-white py-12 px-6 md:px-20">
      {/* Headings */}
      <h2 className="testimonials text-4xl font-bold text-orange-600 text-center mb-2">
        What Our Users Say
      </h2>
      <p className="desc text-center text-orange-500 mb-10 text-base md:text-lg">
        Drag or swipe the cards to see more
      </p>

      {/* Swiper Container */}
      <div ref={containerRef}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          grabCursor={true}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide  key={index}>
              <div
                className=" bg-white shadow-lg rounded-2xl p-8 h-full flex flex-col justify-between border-t-4 border-orange-400
                           transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl mb-6 cursor-grab"
              >
                <div className="flex flex-col items-center text-center mb-4">
                  <span className="text-4xl text-orange-400 mb-2">“</span>
                  <p className="text-black font-bold text-lg md:text-xl">
                    {t.message}
                  </p>
                </div>
                <div className="text-center mt-4">
                  <h3 className="text-lg font-semibold text-orange-600">{t.name}</h3>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
