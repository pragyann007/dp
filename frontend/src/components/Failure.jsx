import React from "react";
import { FaTimesCircle } from "react-icons/fa"; // red error icon
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 px-6">
      <div className="bg-white shadow-2xl rounded-2xl p-10 max-w-lg w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <FaTimesCircle className="text-red-500 text-6xl animate-bounce" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-red-600 mb-4">
          Payment Failed!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Oops! Something went wrong with your payment.  
          Don’t worry, your account has not been charged.  
          Please try again or contact our support team.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/courses")}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Failure;
