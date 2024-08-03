"use client";

import { useContext, useEffect, useState } from "react";
import Autocomplete from "../app/components/Autocomplete";
import MapBlock from "../app/components/MapBlock";
import { AppContext } from "../context/AppContext";
import Cardata from "../app/components/carcard/Cardata";
import Welcome from "./components/Welcome";
import { IoIosHome } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import UserCard from "../app/components/carcard/UserCard";
import { AppProvider } from "../context/AppContext";
import { DriverProvider } from "../context/DriverContext";

import { useRouter } from "next/navigation";

function App() {
  const { state, dispatch } = useContext(AppContext);
  const [confirm, setConfirm] = useState(false);
  const [tripId, setTripId] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true); // State to manage welcome screen visibility
  const Router = useRouter();

  useEffect(() => {
    // Check if the user has already seen the welcome page
    const hasSeenWelcome = localStorage.getItem("hasSeenWelcome");

    if (hasSeenWelcome) {
      setShowWelcome(false);
    }

    // Fetch location initially
    getUserLocation();

    // Set up an interval to fetch the location every 5 seconds
    const intervalId = setInterval(getUserLocation, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          dispatch({
            type: "SET_USER_LOCATION",
            payload: newLocation,
          });
          // console.log("Updated User Location:", newLocation);
        },
        (error) => {
          console.error("Error fetching location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleUserInteraction = () => {
    localStorage.setItem("hasSeenWelcome", "true"); // Mark welcome page as seen
    Router.push("/sign-in-new");
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {showWelcome ? (
        <div onClick={handleUserInteraction}>
          <Welcome />
        </div>
      ) : (
        <>
          {/* Booking */}
          <div className="flex justify-center">
            <div className="fixed z-30 top-5 flex items-center gap-4 bg-orange-400 p-1 justify-center md:w-[35%] rounded-2xl">
              {confirm ? <></> : <Autocomplete confirm={confirm} />}
            </div>
          </div>
          {/* Map */}
          <div className="flex-1">
            <MapBlock />
          </div>
          {/* Booking Car */}
          <div>
            {confirm ? (
              <UserCard
                setConfirm={setConfirm}
                location={state.userLocation}
                setTripId={setTripId}
                tripId={tripId}
              />
            ) : (
              <Cardata
                setConfirm={setConfirm}
                location={state.userLocation}
                setTripId={setTripId}
                tripId={tripId}
              />
            )}
          </div>
          {/* Footer */}
          <div className="z-40 fixed bottom-0 w-full text-center h-16 bg-gray-400">
            <div className="flex justify-between mx-6">
              {/* Home */}
              <div className="flex flex-col items-center py-2">
                <h1>
                  <IoIosHome size={30} className="text-yellow-400" />
                </h1>
                <h1 className="uppercase font-semibold text-sm text-yellow-400">
                  Home
                </h1>
              </div>
              {/* My Trip */}
              <div className="flex flex-col items-center py-2">
                <h1>
                  <GiNotebook size={30} className="text-yellow-400" />
                </h1>
                <h1 className="uppercase font-semibold text-sm text-yellow-400">
                  My Trip
                </h1>
              </div>
              {/* Wallet */}
              <div className="flex flex-col items-center py-2">
                <h1>
                  <FaWallet size={30} className="text-yellow-400" />
                </h1>
                <h1 className="uppercase font-semibold text-sm text-yellow-400">
                  Wallet
                </h1>
              </div>
              {/* Profile */}
              <div className="flex flex-col items-center py-2">
                <h1>
                  <CgProfile size={30} className="text-yellow-400" />
                </h1>
                <h1 className="uppercase font-semibold text-sm text-yellow-400">
                  Profile
                </h1>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function AppWrapper() {
  return (
    <AppProvider>
      <DriverProvider>
        <App />
      </DriverProvider>
    </AppProvider>
  );
}

export default AppWrapper;
