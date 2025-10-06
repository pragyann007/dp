import axios from "axios";
import React, { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { serverPath } from "../../serverPath";
import { toast, ToastContainer } from "react-toastify";
import { clearUserData } from "../redux/userSlice";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.userData);
  const { isPaid } = useSelector((state) => state.paidUser);

  const logout = async () => {
    try {
      await axios.get(`${serverPath}/api/user/auth/logout`, {
        withCredentials: true,
      });
      dispatch(clearUserData());
      toast.success("Logout successful");
      navigate("/");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="w-full h-[80px] bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex justify-between items-center px-4 md:px-8">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="h1 font-bold cursor-pointer text-xl md:text-3xl text-primary"
        >
          Durbar Physics
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex text-[18px] items-center gap-6 text-paragraph-color">
          <Link className="hover:text-primary" to="/">Home</Link>
          <Link className="hover:text-primary" to="/courses">Courses</Link>
          <Link className="hover:text-primary" to="/contact">Contact</Link>
          <Link className="hover:text-primary" to="/about">About Us</Link>

          {user && (
            <Link className="hover:text-primary" to="/my-payments">
              My Payments
            </Link>
          )}

          {
            user?.user?.role=="admin" && (

              <Link className="hover:text-primary" to="/dp/admin/dashboard">
              Admin Panel
            </Link>

            )
          }

          {user && isPaid && (
            <Link className="hover:text-primary" to="/paiduser/portal">
              Learning Portal
            </Link>
          )}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="bg-primary px-6 py-3 rounded-2xl text-white hover:bg-hover-color transition"
              >
                Register
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-primary px-6 py-3 rounded-2xl hover:bg-secondary hover:text-white transition"
              >
                Login
              </button>
            </>
          ) : (
            <div className="flex gap-4 items-center">
              <button
                onClick={logout}
                className="bg-primary px-6 py-3 rounded-2xl text-white hover:bg-hover-color transition"
              >
                Logout
              </button>
              <h1 className="text-lg font-semibold text-red-600">
                👋 Hi {user?.user?.name || "User"}
              </h1>
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
        <div
          className="md:hidden cursor-pointer text-paragraph-color z-50"
          onClick={() => setIsMobile((prev) => !prev)}
        >
          {isMobile ? <RxCross1 size={24} /> : <AiOutlineMenu size={24} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-secondary text-white flex flex-col items-center pt-24 gap-8 transition-transform duration-300 ease-in-out z-40
          ${isMobile ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <Link to="/" onClick={() => setIsMobile(false)}>Home</Link>
        <Link to="/courses" onClick={() => setIsMobile(false)}>Courses</Link>
        <Link to="/contact" onClick={() => setIsMobile(false)}>Contact</Link>
        <Link to="/about" onClick={() => setIsMobile(false)}>About Us</Link>

        {user && (
          <Link to="/my-payments" onClick={() => setIsMobile(false)}>
            My Payments
          </Link>
        )}

        {user && isPaid && (
          <Link to="/paiduser/portal" onClick={() => setIsMobile(false)}>
            Learning Portal
          </Link>
        )}

        <div className="flex flex-col gap-4 mt-6 w-full px-6">
          {!user ? (
            <>
              <button
                onClick={() => {
                  navigate("/register");
                  setIsMobile(false);
                }}
                className="bg-primary cursor-pointer w-full py-2 rounded-2xl text-white hover:bg-hover-color transition"
              >
                Register
              </button>
              <button
                onClick={() => {
                  navigate("/login");
                  setIsMobile(false);
                }}
                className="border cursor-pointer border-white w-full py-2 rounded-2xl hover:bg-primary hover:text-white transition"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setIsMobile(false);
              }}
              className="bg-primary cursor-pointer w-full py-2 rounded-2xl text-white hover:bg-hover-color transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => setIsMobile(false)}
        />
      )}
      <ToastContainer />
    </nav>
  );
};

export default Nav;
