import React from "react";
import { PrevPage } from "../../components";
const page = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full sm:w-[71.6mm] min-h-screen sm:min-h-[147.6mm] max-h-screen sm:max-h-[147.6mm] bg-[rgb(var(--foreground-rgb))] text-black border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-between sm:p-8 p-6 ">
          <PrevPage name={""} link={"/getstarted-driver"} />
          <img
            src="/driver/create-account.PNG"
            attribute="Create Acccount"
            className="w-full sm:h-44 h-48 mt-10 ml-4"
          />
        </div>
      </div>
    </>
  );
};

export default page;
