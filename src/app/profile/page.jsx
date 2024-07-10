import React from "react";
import Link from "next/link";
import { ProfilePic, PrevPage, More } from "../components/";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full sm:w-[71.6mm] min-h-screen sm:min-h-[147.6mm] max-h-screen sm:max-h-[147.6mm] bg-[rgb(var(--foreground-rgb))] text-black border border-gray-300 rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-between">
        <PrevPage link={"/"} />
        <div className="flex flex-col text-center flex-1 justify-center">
          <ProfilePic name={"mark"} />
        </div>
        <div className="w-full sm:mb-4 mb-6">
          <div className="w-full p-4">
            <More />
          </div>
          <div className="w-full p-8">
            <Link href={"/"}>
              <h4 className="font-medium sm:text-xl text-2xl">Log Out</h4>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
