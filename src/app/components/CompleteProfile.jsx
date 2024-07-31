import React, { useState } from "react";
import { IoChevronForward, IoPerson, IoBusinessOutline } from "react-icons/io5";
import ButtonWithArrow from "./ButtonWithArrow";

const CompleteProfile = ({ onButtonClick }) => {
  const [gender, setGender] = useState("");
  const [agreed, setAgreed] = useState(false);

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
            By Accept , you agree to Company Term's & Conditions
          </label>
        </div>
        <ButtonWithArrow name={"Continue"} onButtonClick={onButtonClick} />
      </div>
    </div>
  );
};

export default CompleteProfile;
