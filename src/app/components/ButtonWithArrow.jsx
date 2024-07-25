import React from "react";
import { FaArrowRight } from "react-icons/fa";
const ButtonWithArrow = ({ name }) => {
  return (
    <button className="bg-yellow-400 w-full rounded-full h-12 text-black font-semibold flex items-center justify-center relative">
      <span className="flex-1">{name}</span>
      <span className="bg-white rounded-full w-8 h-8 flex items-center justify-center absolute right-2 ring-1 ring-black">
        <FaArrowRight className="text-black text-xl" />
      </span>
    </button>
  );
};

export default ButtonWithArrow;
