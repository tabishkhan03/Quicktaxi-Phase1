"use client";
import Link from "next/link";
import React from "react";
import { FaArrowRight } from "react-icons/fa";

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center w-full max-w-md  p-8 rounded-md  gap-8 md:w-1/2">
        <div>
          <img src="./home-page-logo.png" alt="Logo" />
        </div>

        <div className="font-bold text-center mt-4 leading-6">
          <h1 className="text-3xl mb-2">Welcome Aboard!</h1>
          <p>“Where every ride is a journey worth</p>
          <p>taking. Enjoy the convenience</p>
          <p>and comfort of travel with us!"</p>
        </div>

        <Link href="/" className="flex items-center gap-2 mt-6 px-4 py-3 bg-yellow-500 rounded-full hover:bg-yellow-600 font-semibold self-end">
          Get Started <FaArrowRight className="text-xl" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
