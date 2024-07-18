"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { AppContext, AppProvider } from "../../../context/AppContext";
import MapBlock from "@/components/MapBlock";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Address from "../../components/Address";
import YellowButton from "@/components/YellowButton";

const NavigationDriverPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useContext(AppContext);
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip_id = searchParams.get("trip_id");
        const driver_id = searchParams.get("driver_id");

        if (trip_id && driver_id) {
          console.log(
            "Fetching data with trip_id and driver_id:",
            trip_id,
            driver_id
          );

          const response = await axios.post(
            "http://localhost:3000/api/trips/confirmed-trip",
            {
              trip_id,
              driver_id,
            }
          );
          console.log(response.data);
          setTripData(response.data);

          if (response.data) {
            dispatch({
              type: "SET_SOURCE_LOCATION",
              payload: {
                lat: response.data.start_location_lat,
                lng: response.data.start_location_lng,
              },
            });
            dispatch({
              type: "SET_DESTINATION_LOCATION",
              payload: {
                lat: response.data.end_location_lat,
                lng: response.data.end_location_lng,
              },
            });
          }
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    setContextWithHardcodedValues(); // Set initial context values for testing
  }, []);

  useEffect(() => {
    // Set initial context values with the driver's current location
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      dispatch({
        type: "SET_USER_LOCATION",
        payload: { lat: latitude, lng: longitude },
      });

      dispatch({
        type: "SET_SOURCE_LOCATION",
        payload: { lat: latitude, lng: longitude },
      });

      // Set destination to Thane, Maharashtra
      dispatch({
        type: "SET_DESTINATION_LOCATION",
        payload: { lat: 19.2183, lng: 72.9781 },
      });
    });

    setContextWithHardcodedValues();
  }, []);

  const setContextWithHardcodedValues = () => {
    dispatch({
      type: "SET_DIRECTION",
      payload: {
        routes: [
          {
            geometry: {
              coordinates: [
                [-122.4194, 37.7749],
                [-122.4192, 37.775],
                [-122.4191, 37.7751],
                [-122.0838, 37.3861],
              ],
            },
          },
        ],
      },
    });
  };

  const handleClick = () => {
    console.log("Start ride");
    // Add navigation logic here if needed
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-1 relative">
        <MapBlock
        // userLocation={state.userLocation || { lng: -122.4194, lat: 37.7749 }}
        // sourceLocation={
        //   state.sourceLocation || { lng: -122.4194, lat: 37.7749 }
        // }
        // destinationLocation={
        //   state.destinationLocation || { lng: -122.0838, lat: 37.3861 }
        // }
        // direction={[
        //   [-122.4194, 37.7749],
        //   [-122.4192, 37.775],
        //   [-122.4191, 37.7751],
        //   [-122.0838, 37.3861],
        // ]}
        />
      </div>
      <Link
        href="/home-driver"
        className="w-full p-4 absolute top-0 left-0 flex flex-row gap-x-2"
      >
        <FaArrowLeft className="text-black sm:text-3xl text-4xl" />
      </Link>
      <div className="w-full text-center absolute top-16 left-0 right-0 mx-auto">
        <span className="font-bold text-black text-lg">Customer Location</span>
      </div>
      <div className="absolute bottom-24 left-4 right-4">
        <Address add={tripData ? tripData.start_location : "Loading..."} />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <YellowButton
          text={"Navigate to customer's location"}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

const NavigationDriverWrapper = () => (
  <AppProvider>
    <NavigationDriverPage />
  </AppProvider>
);

export default NavigationDriverWrapper;
