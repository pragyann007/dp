import React, { useState } from 'react'
import Nav from '../components/Nav'
import { FaGoogle } from "react-icons/fa6";
import axios from 'axios';
import { serverPath } from '../../serverPath';
import OtpInput from '../components/Otp';
import { toast, ToastContainer } from "react-toastify"
import Layout from './layout';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState("")
  const [showotp, setshowOtp] = useState(false)
  const handleRegister = async (e) => {
    e.preventDefault();


    try {
      const res = await axios.post(`${serverPath}/api/user/auth/register`, {
        name, email, password , phone
      }, { withCredentials: true });
      console.log("sucess", res.data)
      toast.success("Otp Sent ..")
      setTimeout(() => {
        setshowOtp(prev=>!prev)

      }, 2000);



    } catch (error) {
  // 1️⃣ Axios server response
  const serverMessage = error.response?.data?.message;

  // 2️⃣ Mongoose validation errors or custom error object
  const mongooseMessage =
    error.response?.data?.error?.message || // if backend sent error object
    error.response?.data?.error?.errors?.[Object.keys(error.response?.data?.error?.errors || {})[0]]?.message;

  // 3️⃣ Axios generic message
  const axiosMessage = error.message;

  // Final message: first non-empty one
  const finalMessage = serverMessage || mongooseMessage || axiosMessage || "Something went wrong";

  toast.error(`Could not register: ${finalMessage}`);
  console.log("Full error:", error);

    }

  }


  return (

  <Layout>
      <div className='mb-10' >
      {!showotp?(
        <div className='flex justify-center items-center mt-10 md:mt-22 '>

        <div className="max-w-md mx-auto mt-16 p-4 md:p-8 gap-4 flex flex-col   rounded-2xl shadow-lg shadow-orange-300 ">
          <h1
            className="font-bold mb-4  md:mb-6  text-center cursor-pointer text-xl md:text-3xl text-primary"
          >
            Durbar Physics
          </h1>
          <form className='flex flex-col gap-2  md:gap-4 ' action="">
        
            {/* fullname */}
            <div className='flex flex-col gap-2 '>
              <label htmlFor="" className='md:text-[18px] text-[14px] ' >Full Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text" className='p-2 border-1 border-slate-500 w-[300px] rounded-lg  outline-secondary' placeholder='Enter your full Name ' />
        
            </div>
            {/* email */}
            <div className='flex flex-col gap-2 '>
              <label htmlFor="" className='md:text-[18px] text-[14px] ' >Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
        
                value={email}
                type="email" className='p-2 border-1 border-slate-500 w-[300px] rounded-lg  outline-secondary' placeholder='Enter your email  ' />
        
            </div>
            {/* phone no  */}
            <div className='flex flex-col gap-2 '>
              <label htmlFor="" className='md:text-[18px] text-[14px] ' >Phone Number </label>
              <input
                onChange={(e) => setPhone(e.target.value)}
        
                value={phone}
                type="email" className='p-2 border-1 border-slate-500 w-[300px] rounded-lg  outline-secondary' placeholder='Enter your phone number . ' />
        
            </div>
            {/* password */}
        
            <div className='flex flex-col gap-2 '>
              <label htmlFor="" className='md:text-[18px] text-[14px] ' >Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
        
        
                value={password}
                type="password" className='p-2 border-1 border-slate-500 w-[300px] rounded-lg  outline-secondary' placeholder='Enter Password .. ' />
        
            </div>
        
            {/* register button  */}
        
            <div>
              <button
                onClick={handleRegister}
                className='bg-primary cursor-pointer  flex justify-center gap-8 rounded-xl md:rounded-2xl md:text-[18px] text-[15px]  text-white px-3 py-2  md:px-4 md:py-3 w-full items-center '  > Register Now </button>
            </div>
        
        
        
          </form>
        </div>
        
        </div>
      ):(<OtpInput email={email} />)}
     


    
      <ToastContainer/>

    </div>
  </Layout>
  
    

  )
}

export default Register