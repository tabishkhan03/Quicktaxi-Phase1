"use client";
import { useEffect, useContext, useState } from "react";
import { AppContext, AppProvider } from "../../../context/AppContext";
import { FaArrowLeft, FaUser } from "react-icons/fa";
import Link from "next/link";
import MapBlock from "../../components/MapBlock";
import YellowButton from "../../components/YellowButton";
import LoadingOverlay from "../../components/LoadingOverlay";
import RideRequest from "../../components/RideRequest";

const HomeDriverPage = () => {
  const { state, dispatch } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rideRequests, setRideRequests] = useState([]); // Initialize as an empty array

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
      const response = await fetch(
        "http://localhost:3000/api/trips/ready-trips"
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setRideRequests(data); // Update the state with the fetched data
      } else {
        console.error("Error: Fetched data is not an array", data);
        setRideRequests([]); // Set an empty array to avoid mapping issues
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching ready trips:", error);
      setRideRequests([]); // Set an empty array to avoid mapping issues
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
        <div className="absolute bottom-20 left-0 right-0 p-4 space-y-4 max-h-[calc(1.5*theme(height.40))] overflow-y-auto custom-scrollbar bg-white pt-8 rounded-3xl">
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



