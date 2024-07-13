"use client";

import { useState, useEffect, useContext } from "react";
import { AppContext, AppProvider } from "../../context/AppContext";
import Autocomplete from "@/components/Autocomplete";
import MapBlock from "@/components/MapBlock";
import Cardata from "@/components/carcard/Cardata";
import { IoIosHome } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { FaWallet } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const App = () => {

  const { state, dispatch } = useContext(AppContext);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      dispatch({
        type: 'SET_USER_LOCATION',
        payload: {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        },
      });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <>
      <div>
        <div className="flex justify-center">
          <div className="fixed z-30 top-5 flex items-center gap-4 bg-orange-400 p-1 justify-center md:w-[35%] rounded-2xl">
            <Autocomplete />
          </div>
        </div>

        <div>
          <MapBlock />
        </div>

        <div className="w-100">
          <Cardata />
        </div>
        
        <div className="z-40 fixed bottom-0 w-[100%] text-center h-16 bg-gray-400">
          <div className="flex justify-between mx-6">
            <div className="flex flex-col items-center py-2">
              <IoIosHome size={30} className="text-yellow-400" />
              <h1 className="uppercase font-semibold text-sm text-yellow-400">Home</h1>
            </div>
            <div className="flex flex-col items-center py-2">
              <GiNotebook size={30} className="text-yellow-400" />
              <h1 className="uppercase font-semibold text-sm text-yellow-400">My Trip</h1>
            </div>
            <div className="flex flex-col items-center py-2">
              <FaWallet size={30} className="text-yellow-400" />
              <h1 className="uppercase font-semibold text-sm text-yellow-400">Wallet</h1>
            </div>
            <div className="flex flex-col items-center py-2">
              <CgProfile size={30} className="text-yellow-400" />
              <h1 className="uppercase font-semibold text-sm text-yellow-400">Profile</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const AppWrapper = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default AppWrapper;
