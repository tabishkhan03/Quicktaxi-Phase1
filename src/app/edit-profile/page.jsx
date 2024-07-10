import React from "react";
import { ChangeProfile, PrevPage, ProfilePic } from "../components";

const page = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full sm:w-[71.6mm] min-h-screen sm:min-h-[147.6mm] max-h-screen sm:max-h-[147.6mm] bg-[rgb(var(--foreground-rgb))] text-black border border-gray-300 rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-between">
          <PrevPage name={"Fill Your Profile"} link={"/profile"} />
          <div className="flex flex-col text-center flex-1 justify-center">
            <ProfilePic />
          </div>
          <div className="w-full ">
            <ChangeProfile />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
