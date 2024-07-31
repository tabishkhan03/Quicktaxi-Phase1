import React, { useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import ButtonWithArrow from "./ButtonWithArrow";

const Upload = ({ title, instructions, subtitle, onButtonClick }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="bg-white h-screen w-full max-w-md mx-auto flex flex-col mt-12">
      <div className="px-4 flex-grow">
        <h2 className="text-xl text-center font-semibold mb-4">{title}</h2>
        <div className="space-y-2 mb-6">
          {instructions.map((text, index) => (
            <div key={index} className="flex items-center ">
              <div className="flex justify-center items-center ">
                <BsCheckCircleFill className="text-gray-400 mr-2" />
              </div>
              <span className="text-sm text-gray-600">{text}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="my-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">{subtitle}</h3>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
          >
            <FiUpload className="text-4xl text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload Documents</span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
        {file && (
          <div className="flex items-center bg-gray-100 p-2 rounded-lg">
            <div className="w-12 h-12 bg-gray-300 rounded-lg mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">Profile</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={() => setFile(null)}
              className="ml-auto text-gray-400 hover:text-gray-500 text-xl"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div className="p-4 mt-auto">
        <ButtonWithArrow name={"Continue"} onButtonClick={onButtonClick} />
      </div>
    </div>
  );
};

export default Upload;
