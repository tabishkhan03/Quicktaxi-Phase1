import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full sm:w-[71.6mm] min-h-screen sm:min-h-[147.6mm] max-h-screen sm:max-h-[147.6mm] bg-[rgb(var(--foreground-rgb))] text-black border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-between sm:p-8 p-6 ">
          <div className="flex flex-col gap-y-4">
            <h1 className="uppercase text-black sm:text-4xl text-3xl font-extrabold">
              QUICKTAXI
            </h1>
            <div className="h-0.5 w-full bg-black rounded-full" />
          </div>
          <img
            src="/driver/welcome-driver.PNG"
            alt="welcome-driver"
            className="sm:w-full sm:h-44 w-fit bg-transparent bg-none"
          />
          <div className="flex flex-col gap-0">
            <span className="sm:text-xs text-center font-bold">
              We're thrilled to have you join our team.
            </span>
            <p className="sm:text-xs text-center font-bold">
              Get ready to drive, earn, and make every ride a fantastic
              experience for our passengers. Let's hit the road together!
            </p>
          </div>
          <div className="w-full flex justify-end">
            <Link
              href="/"
              className="flex flex-row gap-2 bg-yellow-400 text-black hover:bg-yellow-500 rounded-3xl sm:w-3/4 w-fit h-8 text-center py-1 px-2 justify-between"
            >
              <span>Get Started</span>
              <FaArrowRight className="text-xl m-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
