import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

const PrevPage = ({ name, link }) => {
  return (
    <>
      <Link
        href={link}
        className="w-fit p-4 absolute top-0 left-0 flex flex-row gap-x-2"
      >
        <FaArrowLeft className="text-black sm:text-3xl text-4xl" />
        <span className="text-sm sm:text-base text-gray-600 mt-1 font-semibold">
          {name}
        </span>
      </Link>
    </>
  );
};

export default PrevPage;
