import React, { useState, useEffect } from "react";
import axios from "axios";
import Popup from "./Popup";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiUpload } from "react-icons/fi";
import ButtonWithArrow from "./ButtonWithArrow";

const Upload = ({
  title,
  instructions,
  subtitle,
  onButtonClick,
  maxFiles,
  driverId,
}) => {
  const [files, setFiles] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupDetails, setPopupDetails] = useState({ imageSrc: "", text: "" });

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles, ...selectedFiles].slice(0, maxFiles);
      return newFiles;
    });
  };

  const removeFile = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const performApiCall = async (title, files, driverId) => {
    console.log("inside performApiCall", title);

    try {
      const formData = new FormData();

      let apiEndpoint;
      switch (title) {
        case "Profile Picture":
          console.log("Inside perform switch");
          apiEndpoint = "/api/drivers/upload-profile";
          formData.append("profile_pic", files[0]);
          formData.append("driverId", driverId);
          setPopupDetails({
            imageSrc: "/driver/profilePopup.PNG",
            text: "Great job! Your profile is complete. Now, let's move on to secure your payments by adding your bank details.",
          });
          break;
        case "Bank Account Details":
          apiEndpoint = "/api/drivers/upload-bank-details";
          formData.append("bank-document", files[0]);
          formData.append("driverId", driverId);
          setPopupDetails({
            imageSrc: "/driver/bankPopup.PNG",
            text: "Awesome! Your bank details are all set.Next, let's make sure we have your driving details to keep you on the road safely.",
          });
          break;
        case "Driving License":
          apiEndpoint = "/api/drivers/upload-driving-license";
          formData.append("license_front", files[0]);
          formData.append("license_back", files[1]);
          formData.append("driverId", driverId);
          setPopupDetails({
            imageSrc: "/driver/drivingLicensePopup.PNG",
            text: "Well done! Your driving details are updated. Finally, let's add your taxi information to complete your profile.",
          });
          break;
        case "Taxi Details":
          apiEndpoint = "/api/drivers/upload-taxi-images";
          formData.append("photo_front", files[0]);
          formData.append("photo_back", files[1]);
          formData.append("photo_inside", files[2]);
          formData.append("driverId", driverId);
          break;
        default:
          throw new Error("Invalid upload type");
      }
      if (title != "Taxi Details") {
        const response = await axios.put(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(`${title} uploaded successfully`);
        if (response.status === 200) {
          setFiles([]);
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        }
        return { status: response.status, data: response.data };
      } else {
        const response = await axios.post(apiEndpoint, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(`${title} uploaded successfully`);
        if (response.status === 200) {
          setFiles([]);
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
          }, 5000);
        }
        return { status: response.status, data: response.data };
      }
    } catch (error) {
      console.error(`Error uploading ${title}:`, error);
      return {
        status: error.response ? error.response.status : 500,
        error: error.message,
      };
    }
  };

  return (
    <div className="bg-white h-screen w-full max-w-md mx-auto flex flex-col mt-12 overflow-auto">
      {showPopup && (
        <Popup imageSrc={popupDetails.imageSrc} text={popupDetails.text} />
      )}
      <div className="px-4 flex-grow">
        <h2 className="text-xl text-center font-semibold mb-4">{title}</h2>
        <div className="space-y-2 mb-6">
          {instructions.map((text, index) => (
            <div key={index} className="flex items-center ">
              <div className="flex justify-center items-center ">
                <BsCheckCircleFill className="text-gray-400 mr-2" />
              </div>
              <span className="text-sm text-gray-600">{text}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="my-4">
          <h3 className="text-sm font-medium text-gray-700 mb-4">{subtitle}</h3>
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer"
          >
            <FiUpload className="text-4xl text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload Documents</span>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="hidden"
              multiple={maxFiles > 1}
            />
          </label>
        </div>
        {files.map((file, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 p-2 rounded-lg mb-2"
          >
            <div className="w-12 h-12 bg-gray-300 rounded-lg mr-3"></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{file.name}</p>
              <p className="text-xs text-gray-500">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
            <button
              onClick={() => removeFile(index)}
              className="ml-auto text-gray-400 hover:text-gray-500 text-xl"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <div className="p-4 mt-auto">
        <ButtonWithArrow
          name={"Continue"}
          onButtonClick={() =>
            onButtonClick(performApiCall(title, files, driverId))
          }
          disabled={files.length === 0 || files.length > maxFiles}
        />
      </div>
    </div>
  );
};

export default Upload;
