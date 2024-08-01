"use client";
import React, { useState } from "react";
import { MdCall } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { FaCarSide } from "react-icons/fa";
import { FaCircleDot } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { FaLongArrowAltDown } from "react-icons/fa";
import { DriverContext } from "../../../context/DriverContext";
import { AppContext } from "../../../context/AppContext";
const RideConfirmation = () => {
  const [showMore, setShowMore] = useState(false);
  const {Driverstate, dispatch} = useContext(DriverContext)
  const{state}=useContext(AppContext);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="  flex flex-col items-center justify-center absolute top-32 mt-20 w-[85%] mx-9 px-3 z-50  ove   rounded-t-xl">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg md:max-w-2xl lg:max-w-3xl">
        <h2 className="text-xl font-semibold text-center mb-4">
          Your ride is confirmed
        </h2>
        <p className="text-center text-gray-600 mb-4">
          {Driverstate.driver} will pick you up  
        </p>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-gray-800 font-medium">{Driverstate.number}</p>
            <p className="text-gray-600">{Driverstate.name}</p>
            <p className="text-gray-600">{Driverstate.driver}</p>
            <p className="text-yellow-500">⭐ 4.1</p>
          </div>
          <div className="flex gap-4">
            <img
              className="w-12 h-12 rounded-full"
              src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg"
              alt="Driver Profile"
            />
            <img
              className="w-12 h-12 rounded-full"
              src="https://i.pinimg.com/originals/cf/ed/8e/cfed8eb07d9b0b5f279e3f4c105c3b47.jpg"
              alt="Driver Profile"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-400 mr-2 hover:bg-gray-200">
            <MdCall size={25} />
          </button>
          <input
            type="text"
            placeholder="Message your driver..."
            className="flex-1 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-700 border border-gray-400 mr-2"
          />
          <button className="flex items-center justify-center w-10 h-10 rounded border border-gray-400 hover:bg-gray-200">
            <IoSendSharp size={25} />
          </button>
        </div>

        {showMore && (
          <div className="  rounded mb-4 flex flex-col justify-center items-center bg-gray-50">
            <div className="w-full bg-slate-100 p-2 mt- mb-2 rounded-3xl flex flex-col gap-2 border-2 border-orange-400 relative">
              <div className="flex gap-4 p-1 items-center">
                <FaCircleDot size={25} className="text-yellow-400" />
                <div>
                  <h1 className="h-7 overflow-y-hidden">{state.sourceName}</h1>
                </div>
              </div>

              <hr className=" border-1.5 border-black" />
              <div className="flex gap-4 p-1 items-center">
                <GrLocation size={28} className="text-green-500" />
                <div>
                  <h1 className="h-7 overflow-y-hidden">{state.destinationName}</h1>
                </div>
              </div>
            </div>
            <button className="bg-zinc-300 py-2 px-4 rounded-full w-1/2 mb-4 font-bold text-center hover:bg-zinc-400">
              Cancel
            </button>
            <div className="flex justify-between border-2 border-gray-400 py-4  w-full bg-white shadow-lg rounded-lg ">
              <div className="flex px-2">
                <div className="flex text-gray-800 flex-col items-center">
                  <FaCarSide size={30} />
                  <p className="font-semibold">Car</p>
                </div>
                <div className="flex text-gray-800 flex-col items-center  p-2">
                  <p className="font-semibold">Distance</p>
                  <p className="text-blue-500">0.2 km</p>
                </div>
                <div className="flex text-gray-800 flex-col items-center">
                  <p className="font-semibold">Time</p>
                  <p className="text-blue-500">Approx 25 min</p>
                </div>
                <div className="flex text-gray-800 flex-col items-center px-1">
                  <p className="font-semibold">Distance</p>
                  <p className="text-blue-500">0.2 km</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <button onClick={toggleShowMore} className="hover:text-gray-500">
            {showMore ? (
              <SlArrowUp size={40} className="text-bold" />
            ) : (
              <SlArrowDown size={40} className="text-bold" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RideConfirmation;
