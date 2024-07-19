import React, { useState, useContext, useEffect } from "react";
// import Data from '../../app/data.js';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { AppContext } from "../../../context/AppContext"; // Correct import for AppContext
import { MdOutlinePayment } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";

const Cardata = ({ setConfirm, setTripId, tripId }) => {
  const [menu, setMenu] = useState(true);
  const { state } = useContext(AppContext); // Destructuring state from AppContext
  const {sourceLocation, destinationLocation, direction, sourceName, destinationName } = state; // Destructuring sourceLocation, destinationLocation, direction from state
  const [driverData, setDriverData] = useState([]);

  const [sourceLocationName, setSourceLocationName] = useState('');
  const [sourceDestName, setSourceDestName] = useState('');

  const getCost = (charge) => {
    if (direction && direction.routes && direction.routes.length > 0) {
      const distanceInMiles = direction.routes[0].distance * 0.000621371192;
      return (charge * distanceInMiles).toFixed(2);
    } else {
      return "00.00"; // Default value when direction data is not available
    }
  };

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/drivers/alldrivers");
    const data = await res.json();
    console.log("data", data);
    const finalData = data.map((driver) => {
      console.log(driver);
      return {
        driver: driver.name,
        name: driver.taxis[0]?.model,
        number: driver.taxis[0]?.number,
        charge: driver.taxis[0]?.charge,
        distance: driver.taxis[0]?.distance,
      };
    });
    setDriverData(finalData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleData = async (e) => {
    // e.preventDefault();
    setConfirm(true);

    try {
      const response = await fetch("/api/customer", {
        method: "POST", //Post mean you are using insret api from the customerr folder
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          user_loc: sourceName, 
          user_dis: destinationName,
          status: "ready",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to insert trip data");
      }

      const data = await response.json();
      console.log("Data inserted successfully:", data);
      setTripId(data.data.tripid);
      // Handle success state or feedback to the user
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle error state or feedback to the user
    }
  };

  return (
    <div className="w-full">
      {sourceLocation && destinationLocation ? (
        <div className="z-10 w-full">
          {menu === false ? (
            <div className="absolute bottom-20 flex justify-center items-center w-full">
              <button onClick={() => setMenu(true)}>
                <SlArrowUp size={35} />
              </button>
            </div>
          ) : (
            <div className="absolute inset-x-0 mx-3 bottom-20 md:mx-5 bg-white shadow-2xl rounded-t-2xl">
              <div className="flex justify-center items-center cursor-pointer">
                <button onClick={() => setMenu(false)}>
                  <SlArrowDown size={35} />
                </button>
              </div>
              <div
                className="max-h-64 overflow-y-scroll"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {driverData.map((cars, id) => (
                  <div
                    className="flex justify-between px-2 border-1.5px border-gray-200 py-2 hover:bg-yellow-300"
                    key={id}
                    style={{
                      backgroundColor: id % 2 === 0 ? "#f0f0f0" : "transparent",
                    }} // Example of inline style
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 text-center text-xl">{id}</div>
                      <div>
                        <p className="text-lg font-medium">{cars.name}</p>
                        <p className="text-green-400">{cars.distance}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center mx-2">
                      <p className="text-xl font-medium">{cars.number}</p>
                      <p className="text-green-400">
                        rs.{getCost(cars.charge)}
                      </p>
                    </div>
                  </div>
                ))}
                <hr className="border-2 border-yellow-400" />
                <div className=" fixed bottom-20 w-[95%] mx-3 left-0 bg-slate-300 z-40 border-t-orange-500 border-orange-500">
                  <div className="flex justify-between w-[70%] mx-auto">
                    <div className="flex items-center gap-2">
                      <MdOutlinePayment size={20} className="text-gray-500" />
                      <p className="text-lg font-medium">Payment</p>
                    </div>
                    <p className="text-3xl font-light text-gray-400">|</p>
                    <div className="flex items-center gap-2">
                      <IoTicketSharp size={20} className="text-gray-500" />
                      <p className="text-lg font-medium">Promo code</p>
                    </div>
                  </div>
                  <div className="w-full flex">
                    <button
                      onClick={handleData}
                      className="bg-yellow-400 text-2xl text-white w-[90%] mx-auto py-3 text-center rounded-2xl"
                    >
                      Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Cardata;
