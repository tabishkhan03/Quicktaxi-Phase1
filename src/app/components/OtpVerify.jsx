"use client";
import React, { useState, useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { connectDb } from "../../db/connectDB";
import ButtonWithArrow from "./ButtonWithArrow";

const OtpVerify = ({ onButtonClick, img }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="flex-grow flex flex-col justify-center max-w-sm mx-auto w-full">
        {img ? <img src={img} alt="otp" /> : null}
        <h1 className="text-2xl font-semibold mb-8">Verification</h1>
        <p className="text-gray-600 mb-4">OTP</p>
        <div className="flex justify-between mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500"
              maxLength="1"
            />
          ))}
        </div>
        <p className="text-yellow-500 text-right mb-8 cursor-pointer">
          Resend OTP?
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <ButtonWithArrow name={"Verify"} onButtonClick={onButtonClick} />
      </div>
    </div>
  );
};

export default OtpVerify;
