import React, { useState, useContext, useEffect } from "react";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { AppContext } from "../../../context/AppContext";
import useFcmToken from "../../../hooks/useFcmToken"

import NotificationManager from "../../../hooks/NotificationManager";
import { MdOutlinePayment } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import axios from "axios";
import { DriverContext } from "../../../context/DriverContext";
import {Toaster} from "../../components/notification-ui/Sonner"
const Cardata = ({ setConfirm, setTripId }) => {
  const { token, notificationPermissionStatus } = useFcmToken()


  const [menu, setMenu] = useState(true);
  const { state } = useContext(AppContext);
  const {Driverstate, dispatch} = useContext(DriverContext)
  const {
    sourceLocation,
    destinationLocation,
    direction,
    sourceName,
    destinationName,
  } = state;
  const [driverData, setDriverData] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

 
  //handle notification
  const handleTestNotification = async () => {
    if (!token) {
      console.error("No FCM token available");
      return;
    }
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: "requested",
        message: "request has been send to driver",
        // link: "/contact",
      }),
    });

    const data = await response.json();
    console.log(data);
  };
  // handleTestNotification()
  const getCost = (charge) => {
    if (direction && direction.routes && direction.routes.length > 0) {
      const distanceInMiles = direction.routes[0].distance * 0.000621371192;
      return (charge * distanceInMiles).toFixed(2);
    } else {
      return "00.00";
    }
  };

  const fetchData = async () => {
    const { data } = await axios.get("/api/drivers/alldrivers");
    console.log("Data after fetching", data);
    const finalData = data.map((driver) => ({
      driver: driver.name,
      taxi_id: driver.taxis[0]?.taxi_id,
      name: driver.taxis[0]?.model,
      number: driver.taxis[0]?.number,
      charge: driver.taxis[0]?.charge,
      distance: driver.taxis[0]?.distance,
    }));
    dispatch({
      type: "SET_DRIVER",
      payload:finalData
    });
    setDriverData(finalData);
    console.log("final data: ", finalData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleData = async () => {
    handleTestNotification()
    if (!selectedDriver) {
      console.error("No driver selected");
      return;
    }

    setConfirm(true);

   //toaster notify
 
  //  request has been send to driver

// alert("ride has  been confirmed")
    try {
      const response = await axios.post("/api/customers/bookride", {
        customer_id: "51ab8a10-2b34-45a5-a7e1-67f22c7a472f",
        start_location: sourceName,
        end_location: destinationName,
        source_lat: sourceLocation.lat,
        source_lng: sourceLocation.lng,
        destination_lat: destinationLocation.lat,
        destination_lng: destinationLocation.lng,
        status: "ready",
        start_time: new Date().toISOString(),
      });

      if (response.status !== 200) {
        throw new Error(response.data.error || "Failed to insert trip data");
      }

      const data = response.data;
      console.log("Data inserted successfully:", data);
      setTripId(data.trip.trip_id);
      console.log("tripid ; ",data.trip.trip_id )
    } catch (error) {
      console.error("Error inserting data:", error);
    }
  };

  return (
    <div className="w-full">
     <Toaster/>
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
              <div className="max-h-64 min-h-36 overflow-y-scroll">
                {driverData.length > 0 ? (
                  driverData.map((cars, id) => (
                    <div
                      className={`flex justify-between px-2 border-1.5px border-gray-200 py-2 hover:bg-yellow-300 ${
                        selectedDriver === cars ? "bg-yellow-200" : ""
                      }`}
                      key={id}
                      onClick={() => setSelectedDriver(cars)}
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
                  ))
                ) : (
                  <p>No drivers available</p>
                )}
                <hr className="border-2 border-yellow-400" />
                <div className="fixed bottom-20 w-[95%] mx-3 left-0 bg-slate-300 z-40 border-t-orange-500 border-orange-500">
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
        <NotificationManager />
    </div>
   
  );
};

export default Cardata;
