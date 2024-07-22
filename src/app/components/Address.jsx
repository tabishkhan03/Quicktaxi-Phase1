import React from "react";

const Address = ({ add }) => {
  console.log(add);
  return (
    <div className="w-full h-14 border-2 ring-1 ring-black flex flex-row items-center rounded-2xl bg-white shadow-lg">
      <span className="text-gray-800 font-semibold w-full text-center ">
        {add}
      </span>
    </div>
  );
};

export default Address;
