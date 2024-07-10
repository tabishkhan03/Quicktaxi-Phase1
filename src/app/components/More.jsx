import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const More = () => {
  const options = [
    { name: "Edit Profile", href: "/edit-profile" },
    { name: "Wallet", href: "/wallet" },
    { name: "History", href: "/history" },
    { name: "Settings", href: "/settings" },
  ];

  return (
    <div className="text-black sm:space-y-0.5">
      {options.map((option) => (
        <a
          key={option.name}
          href={option.href}
          className="flex items-center justify-between w-full hover:bg-gray-100 p-4 rounded-lg"
        >
          <span className="text-2xl sm:text-xl text-left font-semibold">
            {option.name}
          </span>
          <FaArrowRight className="text-3xl sm:text-2xl" />
        </a>
      ))}
    </div>
  );
};

export default More;
