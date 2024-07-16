"use client";
import { useEffect, useContext, useState } from "react";
import { AppContext, AppProvider } from "../../../context/AppContext";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import Link from "next/link";
import MapBlock from "../../components/MapBlock";
import YellowButton from "../../components/YellowButton";
import LoadingOverlay from "../../components/LoadingOverlay";

const HomeDriverPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      dispatch({
        type: "SET_USER_LOCATION",
        payload: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, [dispatch]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleFindRide = () => {
    setLoading(true);
    // backend request
    setTimeout(() => {
      setLoading(false);
      // Handle the response
    }, 3000); // 3-second delay
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      {loading && <LoadingOverlay />}
      <div className="flex-1">
        <MapBlock />
      </div>
      <Link
        href="/"
        className="w-full p-4 absolute top-0 left-0 flex flex-row gap-x-2"
      >
        <FaArrowLeft className="text-black sm:text-3xl text-4xl" />
      </Link>
      <div className="w-full p-3 mx-auto absolute top-16 left-0 flex flex-row items-center rounded-2xl bg-white">
        <FaUser className="text-gray-700 text-3xl" />
        <label className="ml-auto inline-flex items-center cursor-pointer">
          <span className="relative">
            <input
              type="checkbox"
              className="sr-only"
              checked={toggle}
              onChange={handleToggle}
            />
            <div
              className={`block ${
                toggle ? "bg-gray-200" : "bg-gray-200"
              } w-14 h-8 rounded-full`}
            ></div>
            <div
              className={`dot absolute left-1 top-1 bg-yellow-500 w-6 h-6 rounded-full transition ${
                toggle ? "transform translate-x-6" : ""
              }`}
            ></div>
          </span>
        </label>
      </div>
      <YellowButton onClick={handleFindRide} />
    </div>
  );
};

const HomeDriverWrapper = () => (
  <AppProvider>
    <HomeDriverPage />
  </AppProvider>
);

export default HomeDriverWrapper;
