"use client";

import { FaArrowLeft, FaBell } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiSolidWallet } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

function CustomerInfo() {
  

  return (
    <form>
      <div className="flex flex-col items-center justify-center mx-auto h-full gap-8  ">
        <div className="w-full md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <FaArrowLeft className="size-9 w-9" />
            <div className="text-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzzjO-xEZ5aJRWqt3NZJm6H-swq2rOqMBK9Q&sg"
                alt="Sign In"
                className="rounded-full h-24 w-24 m-auto"
              />
              <h1 className="text-xl font-semibold mt-5">Hi, Mark</h1>
            </div>

            <div>
              <ul className="flex flex-col gap-4 text-lg font-bold ">
                <li className="flex items-center gap-10" >
                  <AiFillHome className="text-2xl" /> Home
                </li>
                <li className="flex items-center gap-10">
                  <BiSolidWallet className="text-2xl" /> Wallet
                </li>
                <li className="flex items-center gap-10">
                  <FaBell className="text-2xl" /> Notifications
                </li>
                <li className="flex items-center gap-10">
                  <MdHistory className="text-2xl" /> History
                </li>
                <li className="flex items-center gap-10">
                  <IoSettingsSharp className="text-2xl" /> Settings
                </li>
                <li className="flex items-center gap-10">
                  <FiLogOut className="text-2xl" /> Logout
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </form>
  );
}

export default CustomerInfo;
