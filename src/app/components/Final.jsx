import React from "react";
import { IoCheckmark } from "react-icons/io5";
import YellowButton from "./YellowButton";

const Final = ({ img, name, onButtonClick }) => {
  return (
    <div className="bg-white min-h-screen w-full flex flex-col items-center justify-between p-6">
      <div className="w-full max-w-md flex flex-col items-center">
        {/* Illustration */}
        <div className="mb-8 relative w-full aspect-square">
          <div className=" inset-0 flex items-center justify-center">
            <img
              src={img}
              alt="Application Submitted Illustration"
              className="w-full h-full object-contain"
            />
          </div>
          {name == "Finish and Start Driving" ? (
            <>
              <p className="w-full font-bold text-center text-sm md:text-base">
                Congratulations! All your information is now complete.
              </p>
              <p className="w-full font-bold text-center text-sm md:text-base">
                You're ready to hit the road with Quicktaxi.
              </p>
              <p className="w-full font-bold text-center text-sm md:text-base">
                Drive safe and earn well!
              </p>
            </>
          ) : null}
        </div>

        {/* Confirmation Message */}

        {name != "Finish and Start Driving" ? (
          <div className="w-full text-center">
            <div className="bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <IoCheckmark className="text-white text-3xl" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              Application Submitted For Verifications
            </h2>
            <p className="text-gray-600 mb-6 text-sm md:text-base">
              We will get in touch with you in 48 working hours . Be ready for
              your rides!
            </p>
          </div>
        ) : null}
        <div className="absolute bottom-1 w-full">
          <YellowButton text={name} onClick={onButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Final;
