"use client";
import { useEffect, useContext, useState } from "react";
import { AppContext, AppProvider } from "../../context/AppContext";
import {
  FaArrowLeft,
  FaUser,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";
import Link from "next/link";
import MapBlock from "../components/MapBlock";
import YellowButton from "../components/YellowButton";
import LoadingOverlay from "../components/LoadingOverlay";
import RideRequest from "../components/RideRequest";

const HomeDriverPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rideRequests, setRideRequests] = useState([]);

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

  const handleFindRide = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/trips/ready-trips");
      const data = await response.json();
      console.log("data ", data);
      if (Array.isArray(data)) {
        setRideRequests(data);
      } else {
        console.error("Error: Fetched data is not an array", data);
        setRideRequests([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching ready trips:", error);
      setRideRequests([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {loading && <LoadingOverlay />}
      <div className="flex-1 relative">
        <MapBlock />
        <Link
          href="/"
          className="w-full p-4 absolute top-0 left-0 flex flex-row gap-x-2"
        >
          <FaArrowLeft className="text-black sm:text-3xl text-4xl" />
        </Link>
        <div className="w-full p-3 mx-auto absolute top-16 left-0 flex flex-row items-center justify-between bg-white">
          <div className="flex items-center">
            <FaUser className="text-gray-700 text-3xl" />
            <span className="ml-2 font-semibold">Online</span>
          </div>
          <label className="inline-flex items-center cursor-pointer">
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
        <div className="absolute top-32 left-0 right-0 px-4 flex justify-between">
          <div className="bg-white rounded-lg p-3 flex items-center">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Pre-Booked</p>
              <p className="font-bold">9</p>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 flex items-center">
            <FaRupeeSign className="text-gray-500 mr-2" />
            <div>
              <p className="text-sm text-gray-500">Today Earned</p>
              <p className="font-bold">₹1400.00</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-24 left-0 right-0 p-4 space-y-4 max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar bg-white pt-8 rounded-t-3xl">
          <h2 className="text-xl font-semibold mb-4">Ride Request</h2>
          {rideRequests.length === 0 ? (
            <p className="text-center text-gray-500">
              There are no rides available nearby you.
            </p>
          ) : (
            rideRequests.map((request, index) => (
              <RideRequest key={index} request={request} />
            ))
          )}
        </div>
      </div>
      <div className="p-4 bg-white fixed bottom-0 w-full">
        <YellowButton text="Find Ride" onClick={handleFindRide} />
      </div>
    </div>
  );
};

const HomeDriverWrapper = () => (
  <AppProvider>
    <HomeDriverPage />
  </AppProvider>
);

export default HomeDriverWrapper;
