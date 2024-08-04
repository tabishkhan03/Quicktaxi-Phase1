"use client"
import React, { useState } from "react";
import { IoChevronForward, IoPerson, IoBusinessOutline } from "react-icons/io5";
import ButtonWithArrow from "./ButtonWithArrow";
import axios from "axios";

const CompleteProfile = ({ onButtonClick, driverId }) => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [agreed, setAgreed] = useState(false);

  const performApiCall = async () => {
    console.log("DriverId in CompleteProfile component: ", driverId);
    console.log("data from this page: ", name, gender, city);
    if (!name || !gender || !city) {
      console.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.put("/api/drivers/upload-basic", {
        driver_id: driverId,
        name,
        gender,
        city,
      });
      console.log("API response:", response.data);
      return response;
    } catch (error) {
      console.error("Error in API call:", error);
    }
  };

  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center p-6 mt-8">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Complete Your Profile
        </h1>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Your Name</label>
          <div className="flex items-center border border-black focus:ring-yellow-400 p-3">
            <IoPerson className="text-gray-400 mr-2" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type your name here"
              className="w-full outline-none text-gray-700"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">Gender</label>
          <div className="flex space-x-3">
            {["Male", "Female", "Other"].map((option) => (
              <button
                key={option}
                className={`py-2 px-4 rounded-full ${
                  gender === option
                    ? "bg-yellow-400 text-black"
                    : "bg-white text-black border border-gray-300"
                }`}
                onClick={() => setGender(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-2">
            City You Drive In
          </label>
          <div className="flex items-center border border-black focus:ring-yellow-400 rounded-lg p-3">
            <IoBusinessOutline className="text-gray-400 mr-2" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Search your city here"
              className="w-full outline-none text-gray-700"
            />
            <IoChevronForward className="text-gray-400" />
          </div>
        </div>
        <div className="mb-6 flex items-start">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="mt-1 mr-2"
          />
          <label className="text-sm">
            By Accept, you agree to Company Term's & Conditions
          </label>
        </div>
        <ButtonWithArrow
          name={"Continue"}
          onButtonClick={() => {
            if (agreed) {
              onButtonClick(performApiCall());
            } else {
              console.error("You must agree to terms & conditions.");
            }
          }}
        />
      </div>
    </div>
  );
};

export default CompleteProfile;
