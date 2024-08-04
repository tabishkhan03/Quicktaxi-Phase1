"use client";
import Head from "next/head";
import React, { useState, useEffect,Suspense } from "react";
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
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otpCode);

    try {
      const response = await axios.post("/api/auth/verify-otp", {
        phoneNumber,
        otp: otpCode,
      });

      localStorage.setItem("phoneNumber", phoneNumber);
      if (response.status === 200) {
        setOtpSent(true);
        alert("OTP has been sent");
      } else {
        alert(`Failed to send OTP: ${response.data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending OTP");
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      if (otp === generatedOtp) {
        setOtp("");

        if (!phoneNumber) {
          alert("Phone number is missing");
          return;
        }

        const response = await axios.post("/api/auth/verify-phone-customer", {
          phoneNumber: phoneNumber,
          customer_id: customerId,
        });

        if (response.status === 200) {
          alert("Phone number verified successfully");
          router.push("/");
        } else {
          alert("Failed to verify phone number");
        }
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.error("An error has occurred while storing Phone No", error);
      alert("An error has occurred while storing Phone No");
    }
  };


  return (
    <Suspense fallback={<div>Loading...</div>}>
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Head>
        <title>Sign In</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Let’s Sign in.!</h1>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <div className="mt-1 text-black">
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {otpsent && (
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-black"
              >
                OTP
              </label>
              <div className="mt-1 relative text-black">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="Enter OTP"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              onClick={otpsent ? handleOTPSubmit : handleSendOtp}
              className={`bg.${
                otpsent ? "green" : "orange"
              }-500 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
              style={{ backgroundColor: otpsent ? "green" : "orange" }}
            >
              {otpsent ? "Submit OTP" : "Send OTP"}
            </button>
          </div>
        </form>
      </main>
    </div>
    </Suspense>
  );
};

export default Signin;