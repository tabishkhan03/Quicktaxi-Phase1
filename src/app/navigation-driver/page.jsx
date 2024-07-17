"use client";

import React, { useContext } from "react";
import { AppContext, AppProvider } from "../../../context/AppContext";
import MapBlock from "../../components/MapBlock";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Address from "../../components/Address";
import YellowButton from "@/components/YellowButton";

const NavigationDriverPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const sourceLocation = "123, Street Avenue";

  const handleClick = () => {
    console.log("Start ride");
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-1 relative">
        <MapBlock />
      </div>
      <Link
        href="/home-driver"
        className="w-full p-4 absolute top-0 left-0 flex flex-row gap-x-2"
      >
        <FaArrowLeft className="text-black sm:text-3xl text-4xl" />
      </Link>
      <div className="w-full text-center absolute top-16 left-0 right-0 mx-auto">
        <span className="font-bold text-black text-lg">Customer Location</span>
      </div>
      <div className="absolute bottom-24 left-4 right-4">
        <Address add={sourceLocation} />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <YellowButton
          text={"Navigate to customer's location"}
          onClick={handleClick}
        ></YellowButton>
      </div>
    </div>
  );
};

const NavigationDriverWrapper = () => (
  <AppProvider>
    <NavigationDriverPage />
  </AppProvider>
);

export default NavigationDriverWrapper;
