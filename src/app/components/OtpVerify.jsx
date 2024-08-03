"use client";
import React, { useState, useRef } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import axios from "axios";
import { connectDb } from "../../db/connectDB";
import ButtonWithArrow from "./ButtonWithArrow";

const OtpVerify = ({ onButtonClick, img, otpCode, driverId,number }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const performApiCall = async () => {
    console.log("perform api call otp");
    console.log('otp code is', otpCode);
    console.log('otp is', otp);
    console.log("driver id", driverId);
    console.log("number", number);
  
    if (otpCode === otp.toString().replace(/,/g, "")) {
      try {
        const response = await axios.post("/api/auth/verify-phone-driver", {
          phoneNumber: number,
          driver_id: driverId,
        });
        console.log("API response:", response.data);
        // Redirect or handle success
      } catch (error) {
        if (error.response) {
          // The request was made, but the server responded with a status code outside of the range of 2xx
          console.error("API call failed with response error:", error.response.data);
          console.error("Status code:", error.response.status);
          // Handle specific status codes if needed
          if (error.response.status === 400) {
            console.error("Bad Request - Invalid data provided");
          } else if (error.response.status === 401) {
            console.error("Unauthorized - Invalid credentials");
          } else if (error.response.status === 500) {
            console.error("Internal Server Error - Try again later");
          }
        } else if (error.request) {
          // The request was made, but no response was received
          console.error("API call failed with no response received:", error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("API call failed with error:", error.message);
        }
        // General error message for user feedback
        console.error("Failed to verify phone number. Please try again.");
      }
    } else {
      console.log("OTP does not match");
    }
  };
  

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value !== "" && index < 5) {
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
        <div className="flex justify-between mb-8 flex-row gap-x-4">
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
        <ButtonWithArrow name={"Verify"} onButtonClick={() =>
          onButtonClick(performApiCall())}
        />
      </div>
    </div>
  );
};

export default OtpVerify;
