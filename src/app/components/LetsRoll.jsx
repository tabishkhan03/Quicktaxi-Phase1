import React from "react";
import ButtonWithArrow from "./ButtonWithArrow";

const LetsRoll = ({ onButtonClick }) => {
  return (
    <>
      <div className="bg-white rounded-lg w-11/12 sm:w-1/3 p-6 relative mt-4">
        <div className="flex flex-col items-center gap-y-4">
          <img
            src="/driver/lets-roll.PNG"
            alt="LetsRoll"
            className="w-full h-auto mb-4"
          />
          <p className="text-center text-black font-semibold">
            Welcome! To get you on the road quickly, please fill out your
            personal details. This helps us ensure a smooth and safe experience
            for both you and your passengers.
          </p>
          <ButtonWithArrow name={"Let's Roll"} onButtonClick={onButtonClick} />
        </div>
      </div>
    </>
  );
};

export default LetsRoll;
