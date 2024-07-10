"use client";
import React, { useState } from "react";
import Select from "react-select";
import { BsArrowRightCircleFill } from "react-icons/bs";

const ChangeProfile = () => {
  const [gender, setGender] = useState("");

  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  return (
    <form className="mb-6">
      <div className="flex flex-col gap-4 p-6 max-w-md mx-auto">
        <input
          type="text"
          className="border-2 border-gray-300 rounded-lg w-full p-2 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
          placeholder="Name"
        />
        <input
          type="email"
          className="border-2 border-gray-300 rounded-lg w-full p-2 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
          placeholder="Email"
        />
        <input
          type="tel"
          className="border-2 border-gray-300 rounded-lg w-full p-2 h-12 bg-white focus:outline-none focus:ring-2 focus:ring-black text-sm sm:text-base"
          placeholder="Contact Number"
        />
        <Select
          value={genderOptions.find((option) => option.value === gender)}
          onChange={(selectedOption) => setGender(selectedOption.value)}
          options={genderOptions}
          placeholder="Select Your Gender"
          className="basic-single w-full"
          classNamePrefix="select"
          styles={{
            control: (provided) => ({
              ...provided,
              border: "2px solid #d1d5db",
              boxShadow: "none",
              height: "2.5rem",
              fontSize: "0.875rem", // Adjust font size for responsiveness
            }),
            menu: (provided) => ({
              ...provided,
              borderRadius: "0.5rem",
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#9ca3af",
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#000000",
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: "none",
            }),
            dropdownIndicator: (provided) => ({
              ...provided,
              color: "#000000", // Color of the dropdown arrow
            }),
          }}
        />
        <button
          type="submit"
          className="w-full  h-12 bg-[#FFA500] hover:bg-[#FFA550] text-black rounded-full flex items-center justify-between text-sm sm:text-base font-bold py-2 relative"
        >
          <span className="flex-grow text-center">Save</span>
          <BsArrowRightCircleFill className="text-white ring-1 bg-[#FFA500] rounded-full text-xl sm:text-2xl absolute right-2 sm:right-1" />
        </button>
      </div>
    </form>
  );
};

export default ChangeProfile;
