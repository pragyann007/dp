import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { RiYoutubeFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";


const Footer = () => {


  
  return (
    <footer className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-12 px-6 md:px-20">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        {/* Brand */}
        <div>
          <h1 className="h1 text-3xl md:text-4xl font-extrabold tracking-wide">
            Durbar <span className="text-orange-200">Physics</span>
          </h1>
          <p className="h1 mt-2 text-sm text-orange-100 max-w-xs">
            Making physics simple, engaging, and fun for every learner.
          </p>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-wrap gap-6 text-lg font-medium">
          <li>
            <a
              href="#home"
              className="hover:text-orange-200 transition duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#courses"
              className="hover:text-orange-200 transition duration-300"
            >
              Courses
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="hover:text-orange-200 transition duration-300"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="hover:text-orange-200 transition duration-300"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="#register"
              className="hover:text-orange-200 transition duration-300"
            >
              Register
            </a>
          </li>
          <li>
            <a
              href="#login"
              className="hover:text-orange-200 transition duration-300"
            >
              Login
            </a>
          </li>
        </ul>

        {/* Social Icons */}
        <div className="flex gap-5 text-2xl">
          <a
            href="https://facebook.com/profile.php?id=100089417825109"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-200 hover:scale-110 transition-transform duration-300"
          >
            <FaFacebook />
          </a>
          <a
            href="https://www.instagram.com/durbarphysics?igshid=NzZIODBkYWE4Ng%3D%3D"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-200 hover:scale-110 transition-transform duration-300"
          >
            <FaInstagram />
          </a>
          <a
            href="https://x.com/durbarphysics?t=z0aDbk79nRh980wR7cd4kg&s=07"
            target="_blank"
            rel="noreferrer"
            className="hover:text-gray-200 hover:scale-110 transition-transform duration-300"
          >
            <BsTwitterX />
          </a>
          <a
            href="#youtube"
            target="_blank"
            rel="noreferrer"
            className="hover:text-red-200 hover:scale-110 transition-transform duration-300"
          >
            <RiYoutubeFill />
          </a>
          <a
            href="#telegram"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-200 hover:scale-110 transition-transform duration-300"
          >
            <FaTelegramPlane />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-orange-300 mt-10 pt-6 text-center text-md text-orange-100">
        © {new Date().getFullYear()} Durbar Physics. All Rights Reserved.

        <h2 className="text-white-500 font-semibold mt-14 ">Made with <span className="font-bold " >LOVE</span> by <a target="_blank" className="underline" href="https://www.instagram.com/pragyann007" >PRAGYAN</a> </h2>
      </div>
    </footer>
  );
};

export default Footer;
