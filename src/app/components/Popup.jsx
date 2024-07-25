import React from "react";

const Popup = ({ imageSrc, text }) => {
  return (
    <>
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 sm:w-1/3 p-6 relative">
          <div className="flex flex-col items-center">
            <img src={imageSrc} alt="Popup" className="w-full h-auto mb-4" />
            <p className="text-center text-black font-semibold">{text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;
