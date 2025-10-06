import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { serverPath } from "../../serverPath";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${serverPath}/api/admin/login`,
        { email, password },
        { withCredentials: true } // ✅ important for cookie
      );

      if (res.status === 200) {
        const user = res.data.user;
      
        toast.success("Admin logged in successfully!");

        setTimeout(() => {
          navigate("/dp/admin/dashboard");

          window.location.reload();

          
        }, 2500);

       

      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 p-6 rounded-xl shadow-lg w-[350px] bg-orange-50"
      >
        <h2 className="text-center font-bold text-xl text-orange-600">
          Admin Login
        </h2>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-orange-600 text-white py-2 rounded hover:bg-orange-500"
        >
          Login
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AdminLogin;
