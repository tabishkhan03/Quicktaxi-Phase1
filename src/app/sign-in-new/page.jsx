"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CiLock } from "react-icons/ci";
import { TfiEmail } from "react-icons/tfi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import useAuth from "../../utils/useAuth"; // Import the custom hook
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

function Sign() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [isCustomerIdSet, setIsCustomerIdSet] = useState(false);
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(true); // State to toggle between sign-up and login
  const { user, loading, error, signUp, logIn, signInWithOAuth } = useAuth(); // Destructure the auth functions
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/sign-in-new");
    }
  }, [user]);

  useEffect(() => {
    if (customerId) {
      console.log("is SET customer ID", customerId);
      setIsCustomerIdSet(true); 
    }
  }, [customerId]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleOAuth = async (provider) => {
    const response = await signInWithOAuth(provider, "customer");
    console.log("Response from OAuth", response);
    if (response.data.user != null) {
      try {
        const res = await axios.post("/api/customers/customer-profile", {
          email: email,
          password: password,
        });
        console.log(res.data);

        if (response.data.user.aud === "authenticated") {
          router.push(`/login?customerId=${customerId}`);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Calling Auth SignUp");
      const response = await signUp(email, password);
      console.log("Response from Auth", response);

      if (response.data?.user) {
        setCustomerId(response.data.user.id); // Set customerId
      }
    } else {
      console.log("Login Called");
      const response = await logIn(email, password);
      console.log("Response from Auth Login", response);
      if (response.data?.user.aud === "authenticated") {
        router.push(`/login?customerId=${customerId}`);
      }
    }
  };

  // Watch for customerId change and make API call when customerId is set
  useEffect(() => {
    if (customerId) {
      console.log("Making API call with customerId:", customerId);
      const makeApiCall = async () => {
        try {
          const res = await axios.post("/api/customers/customer-profile", {
            customer_id: customerId,
            email,
            password,
          });
          console.log(res.data);
          router.push(`/login?customerId=${customerId}`);
        } catch (error) {
          console.log(error.message);
        }
      };

      makeApiCall();
    }
  }, [customerId, email, password]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col items-center justify-center mx-auto h-full gap-8">
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <FaArrowLeft className="size-9 w-9" />
            <p className="text-2xl font-bold leading-tight tracking-tight text-center">
              Getting Started!
            </p>
            <p className="w-full sm:text-md text-sm text-left text-black font-semibold mt-2">
              Are you a Driver?{" "}
              <Link
                href={"/signin-driver"}
                className="cursor-pointer text-blue-800 font-bold"
              >
                Yes!
              </Link>
            </p>
            <p className="font-bold leading-tight tracking-tight">
              {isSignUp ? "Create an account" : "Log in to your account"}
            </p>
            {error && <p className="text-red-500">{error}</p>}
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
                className="bg-white border border-black sm:text-sm block w-full pl-10 p-4 input-placeholder-black-bold text-black font-semibold"
                placeholder="Password"
                id="password"
                type={showPassword ? "text" : "password"}
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
            <button
              type="submit"
              className="flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 font-semibold justify-center w-full"
            >
              <span className="ml-auto text-lg">
                {isSignUp ? "Sign Up" : "Log In"}
              </span>
              <FaArrowRight className="border p-2 bg-white rounded-full w-12 h-12 text-right ml-auto border-black" />
            </button>
            <p className="font-bold text-center">Or continue with</p>
            <div className="flex gap-12 justify-center">
              <button
                type="button"
                onClick={() => handleOAuth("google")}
                className="text-2xl border-2 p-2 rounded-md border-black"
              >
                <FcGoogle />
              </button>
              <button
                type="button"
                onClick={() => handleOAuth("github")}
                className="text-2xl border-2 p-2 rounded-md border-black"
              >
                <FaGithub />
              </button>
            </div>
            <p className="mt-6 text-sm font-semibold">
              {isSignUp
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                className="text-blue-800 cursor-pointer"
                onClick={() => setIsSignUp(!isSignUp)}
              >
                {isSignUp ? "Log in" : "Sign up"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Sign;