"use client";
import React, { useState } from "react";
import { LiaPhoneSquareSolid } from "react-icons/lia";
import { ButtonWithArrow } from "../components";
import axios from "axios";
import { useRouter } from "next/navigation";

const Sign = ({
  title,
  terms,
  bttnText,
  signUpPage,
  handleSignUpChange,
  onButtonClick,
  driverId, // Added driverId as a prop
}) => {
  const [phoneNumber, setPhoneNumber] = useState(""); // Local state for phone number
  const router = useRouter();

  // const performApiCall = async () => {
  //   if (signUpPage && phoneNumber) {
  //     try {
  //       const response = await axios.put("/api/auth/verify-phone", {
  //         driverId,
  //         phoneNumber,
  //       });
  //       console.log("API response:", response.data);
  //       // Redirect or handle success
  //     } catch (error) {
  //       console.error("API call failed:", error);
  //       // Handle error
  //     }
  //   }
  // };

  return (
    <>
      <div className="mb-2 flex flex-col gap-y-6">
        {signUpPage ? (
          <img
            src="/driver/create-account.PNG"
            alt="Create Account"
            className="w-full sm:h-44 h-48 mt-10 ml-4"
          />
        ) : (
          <img
            src="/driver/login.PNG"
            alt="login"
            className="w-full sm:h-44 h-48 mt-10 ml-4"
          />
        )}
        <h3 className="sm:text-sm text-md text-black font-semibold w-full text-left">
          {title}
        </h3>
        <div className="w-full ring-1 ring-black flex flex-row gap-2 h-14 mt-2">
          <div className="w-[20%] flex flex-row items-center justify-center gap-x-2">
            <LiaPhoneSquareSolid className="sm:text-4xl text-gray-600" />
            <span className="text-gray-600 sm:text-md text-xs">+91</span>
            <div className="h-6 w-0.5 bg-gray-600" />
          </div>

          <input
            type="number"
            className="pl-1 w-[80%] outline-none focus:ring-0"
            placeholder="Type your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number on change
          />
        </div>
        <div className="w-full flex flex-row items-center justify-start gap-2 mt-2">
          <input
            type="checkbox"
            id="terms"
            className="appearance-none h-4 w-4 border border-blue-600 rounded-full focus:outline-none checked:bg-blue-600 checked:border-blue-600"
          />
          <label
            htmlFor="terms"
            className="sm:text-sm text-md font-semibold text-black"
          >
            {terms}
          </label>
        </div>
        <style jsx>{`
          input[type="checkbox"]:checked::before {
            content: "✔";
            display: block;
            text-align: center;
            color: blue;
            font-size: 0.62rem;
            background-color: white;
            border-radius: 50%;
          }
        `}</style>
        <ButtonWithArrow name={bttnText} onButtonClick={onButtonClick} />
        <div className="flex flex-row w-full justify-center">
          {signUpPage ? (
            <>
              <span className="sm:text-sm text-xs text-gray-600">
                Already have an account?
              </span>
              <button
                onClick={handleSignUpChange}
                className="sm:text-sm text-xs text-black font-semibold"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <span className="sm:text-sm text-xs text-gray-600">
                Don't have an account?
              </span>
              <button
                onClick={handleSignUpChange}
                className="sm:text-sm text-xs text-black font-semibold"
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Sign;
