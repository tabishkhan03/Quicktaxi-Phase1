import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

const page = () => {
  return (
    <div className="w-[90%] mx-auto">
      <div className="flex justify-between mt-5">
        <Link href="/">
          <FaArrowLeft className="text-xl" />
        </Link>

        <h1 className="font-semibold">Step 1 of</h1>
      </div>
      {/* percentage */}
      <div className="h-3 w-full bg-gray-200 rounded-full mt-8 ">
        <h1 className="w-[30%] h-3 bg-gray-400 rounded-l-full"></h1>
      </div>
      {/* input */}
     <div className="flex flex-col gap-16 mt-16 ">
     <div className="w-full ">
        <input type="text" placeholder="Enter your Name For Booking Confrimation" className="w-96 md:w-11/12 md:ml-10  p-4 text-xl border-2 rounded-md" />
      </div>
     <div className="w-full ">
        <input type="text" placeholder="Share your age for persornalized services" className="w-96 md:w-11/12 md:ml-10  p-4 text-xl border-2 rounded-md" />
      </div>
     <div className="w-full ">
        <input type="text" placeholder="Let us Know your Location for pickup" className="w-96 md:w-11/12 md:ml-10 p-4 text-xl border-2 rounded-md" />
      </div>
     </div>

     {/* butttons */}
     <div className="flex justify-between mt-[100%] md:mt-[55%] ">
      <Link href="/" ><button className="text-2xl font-semibold border-2 px-12 py-3 border-black">Ignore</button>
      </Link>
      <button className="text-2xl font-semibold bg-blue-800 text-white  px-16  py-3">Next</button>
     </div>
    </div>
  );
};

export default page;
