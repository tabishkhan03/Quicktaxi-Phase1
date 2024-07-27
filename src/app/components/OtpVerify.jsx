"use client";
import React, { useState, useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { connectDb } from "@/db/connectDb";

const OtpVerify = () => {
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

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 4);
    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 4 && /^[0-9]$/.test(char)) {
        newOtp[index] = char;
      }
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 3)].focus();
  };

  const verifyOtp = async () => {
    console.log("hii");
    const res = await connectDb;
    console.log("resposne of db is = " + res);
    setIsLoading(true);
    setError("");
    const otpString = otp.join("");

    try {
      // const response = await axios.post("/api/verify-otp", { otp: otpString });
      console.log("OTP verified:", response.data);
    } catch (err) {
      console.error("OTP verification failed:", err);
      setError("OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    // try {
    //   await axios.post("/api/resend-otp");
    //   // Handle successful resend here
    //   console.log("OTP resent successfully");
    // } catch (err) {
    //   console.error("Failed to resend OTP:", err);
    //   setError("Failed to resend OTP. Please try again.");
    // }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <button className="text-2xl mb-8">
        <IoArrowBack />
      </button>
      <div className="flex-grow flex flex-col justify-center max-w-sm mx-auto w-full">
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
              onPaste={handlePaste}
              className="w-14 h-14 text-center text-xl border-b-2 border-gray-300 focus:outline-none focus:border-yellow-500"
              maxLength="1"
            />
          ))}
        </div>
        <p
          className="text-yellow-500 text-right mb-8 cursor-pointer"
          onClick={resendOtp}
        >
          Resend OTP?
        </p>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          className="flex items-center justify-center bg-yellow-400 text-black font-semibold py-3 px-6 rounded-full hover:bg-yellow-500 transition duration-300"
          onClick={verifyOtp}
          disabled={isLoading || otp.some((digit) => digit === "")}
        >
          <span className="flex-grow text-center">
            {isLoading ? "Verifying..." : "Verify"}
          </span>
          <div className="bg-white rounded-full p-1 ml-2">
            <IoArrowForward className="h-5 w-5 text-black" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default OtpVerify;
