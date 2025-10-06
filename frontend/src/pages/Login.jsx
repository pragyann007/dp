import React, { useState } from "react";
import Layout from "./layout";
import { FaGoogle } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { serverPath } from "../../serverPath";
import { setUserData } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // Update input fields dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // // Admin email redirect
      // if (formData.email === "pragyanthapaliya027@gmail.com") {
      //   navigate("/dp/admin/login");
      //   setLoading(false);
      //   return;
      // }

      const res = await axios.post(
        `${serverPath}/api/user/auth/login`,
        formData,
        { withCredentials: true }
      );

      toast.success("Logged in Successfully..");

      // store user data in Redux
      dispatch(setUserData(res.data));

      // clear input fields
      setFormData({ email: "", password: "" });

      // navigate to homepage
      navigate("/");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data?.error?.message ||
        Object.values(error.response?.data?.error?.errors || {})[0]?.message ||
        error.message ||
        "Something went wrong";

      toast.error(`Could not login: ${message}`);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center mt-10 md:mt-22">
        <div className="max-w-md mx-auto mt-16 p-4 md:p-8 gap-4 flex flex-col rounded-2xl shadow-lg shadow-orange-300">
          <h1 className="font-bold mb-4 md:mb-6 text-center text-xl md:text-3xl text-primary">
            Durbar Physics - Login
          </h1>

          <form className="flex flex-col gap-2 md:gap-4" onSubmit={handleLogin}>
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="md:text-[18px] text-[14px]">Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
                className="p-2 border border-slate-500 w-[300px] rounded-lg outline-secondary"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="md:text-[18px] text-[14px]">Password</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                className="p-2 border border-slate-500 w-[300px] rounded-lg outline-secondary"
                placeholder="Enter Password"
                required
              />
            </div>

           

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-primary cursor-pointer flex justify-center gap-4 rounded-xl md:rounded-2xl md:text-[18px] text-[15px] text-white px-3 py-2 md:px-4 md:py-3 w-full items-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      <ToastContainer />
    </Layout>
  );
};

export default Login;
