import axios from "axios";
import React, { useRef, useState } from "react";
import { serverPath } from "../../serverPath";
import { useNavigate } from "react-router-dom";
import {ToastContainer,toast} from "react-toastify"

export default function OtpInput({email}) {

  const navigate = useNavigate();
  const inputsRef = useRef([]); // store references of all input boxes
  const [otp, setOtp] = useState(""); // store final OTP string
  const [otpfail,setotpFail] = useState(false)

  const handleChange = (e, index) => {
    const value = e.target.value;

    // Only allow digits (0-9)
    if (!/^[0-9]?$/.test(value)) return;

    // Collect all digits into OTP string
    const newOtp = inputsRef.current.map((input) => input.value).join("");
    setOtp(newOtp);

    // Move to next input if a digit is typed
    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Move back if input is cleared
    if (!value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = async () => {
    try {
      console.log(email);
  
      // convert string otp -> number
      const numericOtp = Number(otp);
  
      const res = await axios.post(
        `${serverPath}/api/user/auth/verifyOtp`,
        { email, otp: numericOtp },   // send number not string
        { withCredentials: true }
      );
  
      console.log("Success", res.data);
      if (res.status === 200) {
        setOtp(""); // reset input
        toast.success("Otp verified successfully .. ");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      console.log("Error while verifying otp in frontend", error);
      setotpFail(true);
      toast.error("Invalid Otp ...", error.response?.data?.message);
    }
  };
  

  return (
    <div className="md:w-[520px] w-[320px]  overflow-x-hidden min-h-[380px]  md:h-[220px]  rounded-2xl shadow-lg shadow-orange-300 flex flex-col  justify-center items-center mx-auto mt-[100px] md:mt-[170px]">
        <h1  className="font-bold mb-6  text-center cursor-pointer text-xl md:text-3xl text-primary"
 >Enter OTP :</h1>
   
    <div className="flex flex-col items-center gap-4">
      {/* OTP input boxes */}
      <div className="flex gap-4 justify-center">
        {[...Array(4)].map((_, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            ref={(el) => (inputsRef.current[i] = el)} // store reference
            onChange={(e) => handleChange(e, i)}
            className="w-10 h-10 text-center border-2 border-gray-300 rounded-md focus:outline-none focus:border-orange-500 text-lg font-bold"
            placeholder="X"
          />
        ))}
      </div>

      {/* Show the OTP value */}
      <p className="text-gray-700 font-semibold">
        Entered OTP: <span className="text-orange-600">{otp}</span>
      </p>

      <div>

        <p className="text-red-500 text-xl mb-4  font-bold " >{otpfail?"Invalid Otp ..":""}</p>
              <button
              onClick={handleVerifyOtp}
             
                className='bg-primary cursor-pointer  flex justify-center gap-8 rounded-2xl text-[18px]  text-white px-4 py-3 w-full items-center '  >Verify OTP </button>
            </div>
    </div>
    <ToastContainer/>
    </div>
  );
}
