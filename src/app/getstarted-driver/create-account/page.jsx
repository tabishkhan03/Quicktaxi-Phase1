"use client";
import React, { useState } from "react";
import { PrevPage, Sign, Popup } from "../../components";
const page = () => {
  const [signUpPage, setSignUpPage] = useState(true);
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full sm:w-[71.6mm] min-h-screen sm:min-h-[147.6mm] max-h-screen sm:max-h-[147.6mm] bg-[rgb(var(--foreground-rgb))] text-black border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-between sm:p-8 p-6">
          <PrevPage name={""} link={"/getstarted-driver"} />
          <Sign
            title={"Create an Account"}
            terms={"Agree to Terms & Conditions"}
            bttnText={"Sign Up"}
            signUpPage={true}
          />
        </div>
      </div>
    </>
  );
};

export default page;
