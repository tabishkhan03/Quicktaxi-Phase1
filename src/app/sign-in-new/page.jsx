"use client";
import Link from "next/link";
import React, { useState } from 'react';
import { FaArrowLeft, FaArrowRight, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CiLock } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FiEye, FiEyeOff } from 'react-icons/fi';


function Sign() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error ,setError]=useState();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <form>
      <div className="flex flex-col items-center justify-center mx-auto h-full gap-8">
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <FaArrowLeft className="size-9 w-9" />
            <p className="text-2xl font-bold leading-tight tracking-tight text-center">
              Getting Started!
            </p>
            <p className="font-bold leading-tight tracking-tight">
              Create an account
            </p>
            <div className="relative">
              <input
                placeholder="Email / Contact"
                className="bg-white border border-black sm:text-sm block w-full pl-10 p-4 input-placeholder-black-bold  text-black font-semibold"
                id="username"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
              <TfiEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold size-5" />
            </div>
            <div className="relative text-black">
              <input
                className="bg-white border border-black sm:text-sm block w-full pl-10 p-4 input-placeholder-black-bold text-black font-semibold
                "
                placeholder="Password"
                id="password"
                type={showPassword ? 'password' : 'text'}
                value={password}
                onChange={handlePasswordChange}
              />
              <CiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-semibold size-6" />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>
            <div className="flex items-start pt-5">
              <div className="checkbox-wrapper relative inline-block w-8 h-8">
  <input
    type="checkbox"
    required
    className="absolute w-full h-full left-0 top-0 m-0 opacity-0 appearance-none"
  />
  <svg viewBox="0 0 35.6 35.6">
    <circle
      className="background fill-[#5ee71e] transition-all duration-600 ease-in-out"
      cx="17.8"
      cy="17.8"
      r="17.8"
    ></circle>
    <circle
      className="stroke fill-none stroke-white stroke-miterlimit-10 stroke-[2px] transition-all duration-600 ease-in-out"
      cx="17.8"
      cy="17.8"
      r="14.37"
    ></circle>
    <polyline
      className="check fill-none stroke-white stroke-linecap-round stroke-linejoin-round stroke-[2px] transition-all duration-600 ease-in-out"
      points="11.78 18.12 15.55 22.23 25.17 12.87"
    ></polyline>
  </svg>
</div>

              <div className="ml-3 text-sm">
                <a href="#" className="hover:underline font-bold mt-3">
                  Agree to Terms & Conditions
                </a>
              </div>
            </div>
            <Link
              href="/home-new"
              className="flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-400 rounded-full hover:bg-yellow-500 font-semibold justify-center"
            >
              <span className="ml-auto text-lg">Sign Up</span>
              <FaArrowRight className=" border p-2 bg-white rounded-full w-12 h-12 text-right ml-auto border-black" />
              
            </Link>
            <p className="font-bold text-center">Or continue with</p>
            <div className="flex gap-12 justify-center">
              <FcGoogle className="text-2xl border p-2 bg-white rounded-full w-12 h-12 shadow-lg shadow-indigo-500/40 cursor-pointer" />
              <FaApple className="text-2xl border p-2 bg-white rounded-full w-12 h-12 text-center shadow-lg shadow-indigo-500/40 cursor-pointer" />
            </div>
            <p className="font-bold mt-8 text-center">
             Already have an Account?{' '}
              <a href="#" className="text-sm text-blue-800 hover:underline mt-4 font-bold">
                SIGN IN
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Sign;
