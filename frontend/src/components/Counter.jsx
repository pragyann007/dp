import React, { useState } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const Counter = () => {
  const stats = [
    { number: 10000, label: "Happy Students" },
    { number: 20, label: "Expert Tutors" },
    { number: 40, label: "Courses Available" },
  ];

  const { ref, inView } = useInView({
    triggerOnce: true, // run only once
    threshold: 0.3, // % of component visible before triggering
  });

  return (
    <div ref={ref} className="w-full  bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 py-8 md:py-12 md:mt-[-170px]">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 text-white">
        
        {/* Left Text */}
        <div className="md:w-1/3 text-center md:text-left">
          <h2 className="text-xl md:text-3xl font-bold">
            Numbers Speak For Themselves
          </h2>
          <p className="mt-2 text-gray-200 text-sm md:text-base">
            Our achievements reflect the trust of students across Nepal.
          </p>
        </div>

        {/* Right Stats */}
        <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <h3 className="text-2xl md:text-5xl font-extrabold">
                {inView && <CountUp start={0} end={stat.number} duration={2} />}+
              </h3>
              <p className="mt-2 text-gray-200 text-sm md:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Counter;
