import React from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
const navigate = useNavigate()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-6">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 text-center">

        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Payment Received 🎉
        </h1>

        <p className="text-lg text-gray-600 mb-6 leading-relaxed">
          Thank you for your payment! <br />
          Your request has been sent successfully via WhatsApp. Our admin team
          will review it shortly. Once approved, you’ll receive a confirmation
          email with further details.
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold rounded-xl shadow-md transition-all duration-300"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
