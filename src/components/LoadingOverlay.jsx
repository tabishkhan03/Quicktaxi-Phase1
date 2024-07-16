import React from "react";
import { FaSearch } from "react-icons/fa";

const LoadingOverlay = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="flex flex-col items-center justify-center w-32 h-32 mb-2 ring-1 ring-black rounded-full">
        <FaSearch className="text-black text-6xl" />
      </div>
      <p className="text-xl font-bold text-gray-800">Finding Ride</p>
      <p className="text-md text-gray-600">
        Please wait<span className="animate-dots">...</span>
      </p>
    </div>
  );
};

export default LoadingOverlay;
