"use client";
import Head from "next/head";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useAuth from "../../utils/useAuth"; 

const Signin = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpsent, setOtpSent] = useState(false);
  const [customerId, setCustomerId] = useState("");

  const { user } = useAuth(); 
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const customer_id = searchParams.get("customerId");
    console.log("Customer before setting in state variable:", customer_id);
    setCustomerId(customer_id);
    console.log(customer_id);
  }, [searchParams]);

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    console.log("phone", phoneNumber);
    setOtpSent(true);
    try {
      const response = await axios.post(
        "http://localhost:5001/v1/auth/generate-otp",
        { phoneNumber }
      );
      setGeneratedOtp(response.data.otp);
      console.log(response.data);
      console.log(response.data.otp);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      console.log("OTP verified!");
      router.push("/"); 
    } else {
      console.log("Invalid OTP. Please try again.");
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block mb-2">
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            {otpsent && (
              <div className="mb-4">
                <label htmlFor="otp" className="block mb-2">
                  OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={handleOtpChange}
                  className="w-full px-3 py-2 border rounded"
                />
              </div>
            )}
            {!otpsent ? (
              <button
                type="submit"
                onClick={handleSendOtp}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="submit"
                onClick={handleVerifyOtp}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Verify OTP
              </button>
            )}
          </form>
        </div>
      </div>
    </Suspense>
  );
};

const Page = () => {
  const searchParams = useSearchParams();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Signin searchParams={searchParams} />
    </Suspense>
  );
};

export default Page;
