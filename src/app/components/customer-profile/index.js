"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiEdit } from "react-icons/ci";

function Customer() {
  const [gender, setGender] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setDropdownOpen(false);
  };

  return (
    <form>
      <div className="flex flex-col items-center justify-center mx-auto h-full gap-8  ">
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
           <div className="flex justify-between">
           <FaArrowLeft className="size-9 w-9 " />
            <h1 className="text-lg font-bold">
              Edit Your Profile
            </h1>
           </div>
            <div>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzjO-xEZ5aJRWqt3NZJm6H-swq2rOqMBK9Q&sg"
                alt="Sign In" className="rounded-full h-24 w-24 m-auto"
              />
            </div>

            <div className="relative">
              <input
                className="sm:text-sm block p-4 pr-10 font-semibold outline-none border-2 border-zinc-800 rounded-lg text-black placeholder-gray-500 "
                placeholder="User Name"
              />
              <CiEdit className="absolute right-3 top-3 text-xl  text-black  " />
            </div>

            <div className="relative">
              <input
                className="bg-white sm:text-sm block w-full p-4 pr-10 font-semibold outline-none border-2 border-zinc-800 rounded-lg text-black placeholder-gray-500"
                placeholder="Type your Phone Number"
              />
              <CiEdit className="absolute right-3 top-3 text-xl  text-black  " />
            </div>

            <div className="relative">
              <input
                className="bg-white sm:text-sm block w-full p-4 pr-10 font-semibold outline-none border-2 border-zinc-800 rounded-lg text-black placeholder-gray-500"
                placeholder="Type your Email"
              />
              <CiEdit className="absolute right-3 top-3 text-xl  text-black  " />
            </div>

            <div className="relative">
              <div
                className="flex items-center cursor-pointer bg-white sm:text-sm block w-full p-4 pr-10 font-semibold outline-none border-2 border-zinc-800 rounded-lg text-black "
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {gender || "Select Gender"}
                <IoMdArrowDropdown size={25} className="  absolute right-3 top-3 text-xl  text-black " />
              </div>
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-full bg-white border-2 border-zinc-800 rounded-lg z-10">
                  <option
                    className="block p-4 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleGenderChange({ target: { value: "Male" } })}
                  >
                    Male
                  </option>
                  <option
                    className="block p-4 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleGenderChange({ target: { value: "Female" } })}
                  >
                    Female
                  </option>
                  <option
                    className="block p-4 cursor-pointer hover:bg-gray-200"
                    onClick={() => handleGenderChange({ target: { value: "Other" } })}
                  >
                    Other
                  </option>
                </div>
              )}
            </div>

            

            <Link
              href="/home-new"
              className="flex items-center gap-2 mt-6 px-4 py-2 bg-yellow-500 rounded-full hover:bg-yellow-600 font-semibold justify-center"
            >
              <span className="ml-auto text-2xl text-white">Save</span>
              <FaArrowRight className="border p-2 bg-white rounded-full w-12 h-12 text-right ml-auto border-black" />
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Customer;
