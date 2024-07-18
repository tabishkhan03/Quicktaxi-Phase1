import React from "react";

const YellowButton = ({ text, onClick }) => {
  return (
    <div className="sticky bottom-0 w-full flex justify-center bg-white p-4 rounded-t-xl">
      <button
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded-full w-full max-w-xs "
        onClick={onClick}
      >
        {text}
      </button>
    </div>
  );
};

export default YellowButton;
