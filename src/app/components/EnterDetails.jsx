import React from "react";
import { IoChevronForward } from "react-icons/io5";
import ButtonWithArrow from "./ButtonWithArrow";

const EnterDetails = ({ onButtonClick }) => {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center justify-start pt-8">
      <div className="w-full max-w-md px-4">
        <h2 className="text-center text-xl font-bold mb-4">Welcome! , Mark</h2>
        <div className="flex justify-between items-center mb-6">
          {[...Array(4)].map((_, index) => (
            <React.Fragment key={index}>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
              {index < 3 && <div className="flex-grow h-px bg-gray-300"></div>}
            </React.Fragment>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-md font-bold mb-2">Require Steps</h3>
          {["Profile picture", "Bank Account Details", "Driving Details"].map(
            (step, index) => (
              <div
                key={index}
                className="flex items-center justify-between border border-black p-4 rounded-lg mb-2"
              >
                <span className="text-black font-semibold">{step}</span>
                <IoChevronForward className="text-gray-400" />
              </div>
            )
          )}
        </div>
        <div className="mb-6">
          <h3 className="text-md font-bold mb-2">Submitted Steps</h3>
          <div className="flex items-center justify-between border border-black p-4 rounded-lg">
            <span className="text-black font-semibold">Taxi Details</span>
            <IoChevronForward className="text-gray-400" />
          </div>
        </div>
        <ButtonWithArrow name={"Continue"} onButtonClick={onButtonClick} />
      </div>
    </div>
  );
};

export default EnterDetails;
