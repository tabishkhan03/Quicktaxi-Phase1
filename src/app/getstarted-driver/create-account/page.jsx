"use client";
import React, { useState, useEffect } from "react";
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

// Define the list of components
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

const Page = () => {
  const [signUpPage, setSignUpPage] = useState(true);
  const Router = useRouter();
  const searchParams = useSearchParams();
  const [driverId, setDriverId] = useState("");

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
      // console.log("performApiCall called");
      const { status, data } = await performApiCall(); // Call the provided API function
      console.log(status, data);
    }
    // console.log("button clicked");
    // Move to the next component
    const currentIndex = componentsList.indexOf(currentComponent);
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
        newHistory.pop(); //Popping after setting the current component
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
          />
        );
      case "otpVerify":
        return (
          <OtpVerify
            onButtonClick={() => handleButtonClick(OtpVerify.performApiCall)}
            img={"/driver/otp.PNG"}
          />
        );
      case "letsRoll":
        return (
          <LetsRoll
            onButtonClick={() => handleButtonClick(LetsRoll.performApiCall)}
          />
        );
      case "completeProfile":
        return (
          <CompleteProfile
            onButtonClick={() =>
              handleButtonClick(CompleteProfile.performApiCall)
            }
            driverId={driverId}
          />
        );
      case "enterDetails":
        return (
          <EnterDetails
            onButtonClick={() => handleButtonClick(EnterDetails.performApiCall)}
          />
        );
      case "uploadProfile":
        return (
          <Upload
            onButtonClick={() => handleButtonClick(Upload.performApiCall)}
            title={"Profile Picture"}
            subtitle={"Profile Picture"}
            instructions={[
              "Please Upload a Clear Selfie",
              "The Selfie Should have the applicants Face Alone",
              "Upload PDF / JPEG / PNG",
            ]}
            maxFiles={1}
            driverId={driverId}
          />
        );
      case "uploadBank":
        return (
          <Upload
            title={"Bank Account Details"}
            instructions={[
              "Upload Bank Document (Passbook, Cancelled Cheque, Bank Statement, or Digital Account Screenshot)",
              "Upload PDF / JPEG / PNG",
            ]}
            subtitle={"Attach Bank Account Details"}
            onButtonClick={() => handleButtonClick(Upload.performApiCall)}
            maxFiles={1}
            driverId={driverId}
          />
        );
      case "uploadLicense":
        return (
          <Upload
            onButtonClick={() => handleButtonClick(Upload.performApiCall)}
            title={"Driving License"}
            subtitle={"Attach Driving License"}
            instructions={[
              "Photocopies and printouts of documents will not be accepted",
              "Only documents that are less than 10MB in size and in JPG, JPEG, PNG, or PDF format will be accepted",
              "The photos and all details must be clearly visible",
            ]}
            maxFiles={2}
            driverId={driverId}
          />
        );
      case "uploadTaxi":
        return (
          <Upload
            onButtonClick={() => handleButtonClick(Upload.performApiCall)}
            title={"Taxi Details"}
            subtitle={"Taxi Details"}
            instructions={[
              "Photocopies and printouts of documents will not be accepted",
              "Only documents that are less than 10MB in size and in JPG, JPEG, PNG, or PDF format will be accepted",
              "The photos and all details must be clearly visible",
            ]}
            maxFiles={3}
            driverId={driverId}
          />
        );
      case "submitted":
        return (
          <Final
            onButtonClick={() => handleButtonClick(Final.performApiCall)}
            img={"/driver/submitted.PNG"}
            name={"Got it"}
          />
        );
      case "finish":
        return (
          <Final
            onButtonClick={() => handleButtonClick(Final.performApiCall)}
            img={"/driver/finish.PNG"}
            name={"Finish and Start Driving"}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-full sm:w-[71.6mm] min-h-screen sm:min-h-[147.6mm] max-h-screen sm:max-h-[147.6mm] bg-[rgb(var(--foreground-rgb))] text-black border border-gray-300 bg-white rounded-lg shadow-lg overflow-hidden relative flex flex-col items-center justify-between sm:p-8 p-6">
          <PrevPage name={""} onClick={handlePrevPageClick} />
          {renderComponent()}
        </div>
      </div>
    </>
  );
};

export default Page;
