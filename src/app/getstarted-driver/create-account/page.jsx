"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PrevPage,
  Sign,
  OtpVerify,
  LetsRoll,
  CompleteProfile,
  EnterDetails,
  Upload,
  Final,
} from "../../components";

const componentsList = [
  "signUp",
  "otpVerify",
  "letsRoll",
  "completeProfile",
  "enterDetails",
  "uploadProfile",
  "uploadBank",
  "uploadLicense",
  "uploadTaxi",
  "submitted",
  "finish",
];

const PageContent = () => {
  const searchParams = useSearchParams();
  const [signUpPage, setSignUpPage] = useState(true);
  const Router = useRouter();
  const [driverId, setDriverId] = useState("");
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");

  const otpFromChild = (data) => {
    setOtp(data);
  };

  useEffect(() => {
    const driver_id = searchParams.get("driverId");
    console.log("driver_id before setting in state variable:", driver_id);
    setDriverId(driver_id);
    console.log(driverId);
  }, [searchParams]);

  const [componentHistory, setComponentHistory] = useState([componentsList[0]]);
  const [currentComponent, setCurrentComponent] = useState(componentsList[0]);

  console.log("Current component: ", currentComponent);

  const handleButtonClick = async (performApiCall) => {
    if (performApiCall) {
      console.log("performApiCall called");
      const { status, data } = await performApiCall();
      console.log(status, data);
    }
    const currentIndex = componentsList.indexOf(currentComponent);
    if (currentComponent === "finish") {
      Router.push("/home-driver");
    }
    if (currentIndex < componentsList.length - 1) {
      const nextComponent = componentsList[currentIndex + 1];
      setComponentHistory((prevHistory) => [...prevHistory, currentComponent]);
      setCurrentComponent(nextComponent);
    }
  };

  const handlePrevPageClick = () => {
    if (componentHistory.length === 1 && currentComponent === "signUp") {
      Router.push("/getstarted-driver");
    } else {
      console.log("handlePrev: ", currentComponent);
      setComponentHistory((prevHistory) => {
        const newHistory = [...prevHistory];
        console.log("New History: ", newHistory);
        const previousComponent = newHistory[newHistory.length - 1];
        setCurrentComponent(previousComponent);
        newHistory.pop();
        return newHistory;
      });
    }
  };

  const handleSignUpChange = () => {
    setSignUpPage(!signUpPage);
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case "signUp":
        return (
          <Sign
            onButtonClick={() => handleButtonClick(Sign.performApiCall)}
            title={"Create an Account"}
            terms={"Agree to Terms & Conditions"}
            bttnText={signUpPage ? "Sign Up" : "Sign In"}
            signUpPage={signUpPage}
            handleSignUpChange={handleSignUpChange}
            driverId={driverId}
            setNumber={setNumber}
            sendDataToParent={otpFromChild}
          />
        );
      case "otpVerify":
        return (
          <OtpVerify
            onButtonClick={() => handleButtonClick(OtpVerify.performApiCall)}
            img={"/driver/otp.PNG"}
            otpCode={otp}
            number={number}
            driverId={driverId}
          />
        );
      // ... (other cases remain the same)
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full sm:w-[71.6mm] min-h-screen sm:min-h-[147.6mm] max-h-screen sm:max-h-[147.6mm] bg-[rgb(var(--foreground-rgb))] text-black border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-between sm:p-8 p-6">
        <PrevPage name={""} onClick={handlePrevPageClick} />
        {renderComponent()}
      </div>
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
};

export default Page;