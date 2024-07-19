"use client";

import Autocomplete from "@/components/Autocomplete";
import MapBlock from "@/components/MapBlock";
import { useState, useEffect } from "react";

import { AppProvider } from "../../context/AppContext";
import { UserLocation } from "../../context/UserLocation";
import { SourceLocation } from "../../context/SourceLoation";
import { SourceDestination } from "../../context/SourceDestination";
import { Direction } from "../../context/Direction";
import Cardata from "@/components/carcard/Cardata";
import { IoIosHome } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import UserCard from "@/components/carcard/UserCard";
import { Userloc } from "../../context/Userloc";
import { Userdis } from "../../context/Userdis";
import { Canceltrip } from "../../context/Canceltrip";

function App() {
  const [confrim, setConfrim] = useState(false);
  const [userlocation, setUserlocation] = useState({
    lng: 72.831581,
    lat: 19.141955,
  });
  const [sourcelocation, setSourcelocation] = useState(null);
  const [destinationlocation, setDestinationlocation] = useState(null);
  const [direction, setDirection] = useState([]);
  const [location, setLocation] = useState();
  const [location1, setLocation1] = useState();
  const [Tripid, setTripid] = useState(null);

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(function (pos) {
      setUserlocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    });
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <AppProvider>
      <UserLocation.Provider value={{ userlocation, setUserlocation }}>
        <SourceLocation.Provider value={{ sourcelocation, setSourcelocation }}>
          <SourceDestination.Provider
            value={{ destinationlocation, setDestinationlocation }}
          >
            <Direction.Provider value={{ direction, setDirection }}>
              <Userloc.Provider value={{ location, setLocation }}>
                <Userdis.Provider value={{ location1, setLocation1 }}>
                  <Canceltrip.Provider value={{ Tripid, setTripid }}>
                    {/* Booking */}
                    <div className="flex justify-center">
                      <div className="fixed z-30 top-5 flex items-center gap-4 bg-orange-400 p-1 justify-center md:w-[35%] rounded-2xl">
                        {confrim ? <></> : <Autocomplete confrim={confrim} />}
                      </div>
                    </div>
                    {/* Map */}
                    <div>
                      <div className="">
                        <MapBlock />
                      </div>
                    </div>
                    {/* Booking Car */}
                    <div className="">
                      {confrim ? (
                        <UserCard setConfrim={setConfrim} location={location} />
                      ) : (
                        <Cardata setConfrim={setConfrim} />
                      )}
                    </div>
                    {/* Footer */}
                    <div className="z-40 fixed bottom-0 w-[100%] text-center h-16 bg-gray-400">
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
                  </Canceltrip.Provider>
                </Userdis.Provider>
              </Userloc.Provider>
            </Direction.Provider>
          </SourceDestination.Provider>
        </SourceLocation.Provider>
      </UserLocation.Provider>
    </AppProvider>
  );
}

export default App;
