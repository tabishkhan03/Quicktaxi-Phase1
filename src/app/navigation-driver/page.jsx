"use client";
import React, { useContext, useEffect, useState, Suspense } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { AppContext, AppProvider } from "../../context/AppContext";
import MapBlock from "../components/MapBlock";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Address from "../components/Address";
import YellowButton from "../components/YellowButton";
import LoadingOverlay from "../components/LoadingOverlay";

const NavigationDriverContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useContext(AppContext);
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isNavigate, setIsNavigate] = useState(true);

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

          const response = await axios.post("/api/trips/trip", {
            trip_id
          });

          const trip = response.data; // Access the first item in the array
          console.log("trip ", trip);

          if (
            trip &&
            trip.source_lat !== undefined &&
            trip.source_lng !== undefined &&
            trip.destination_lat !== undefined &&
            trip.destination_lng !== undefined
          ) {
            console.log("data before setting trip data ", trip);
            setTripData(trip);
          } else {
            console.error(
              "Trip data is missing required location properties:",
              trip
            );
          }
        }
      } catch (error) {
        console.log("Something went wrong", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    const setLocations = () => {
      if (tripData) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          console.log("lat", latitude, "log", longitude);
          dispatch({
            type: "SET_SOURCE_LOCATION",
            payload: {
              lat: parseFloat(latitude),
              lng: parseFloat(longitude),
            },
          });
        });

        dispatch({
          type: "SET_DESTINATION_LOCATION",
          payload: {
            lat: parseFloat(tripData.source_lat),
            lng: parseFloat(tripData.source_lng),
          },
        });
      }
    };

    setLocations();
  }, [tripData, dispatch]);

  const handleClick = () => {
    console.log("Start ride");
    // Add navigation logic here if needed
    dispatch({
      type: "SET_SOURCE_LOCATION",
      payload: {
        lat: parseFloat(tripData.source_lat),
        lng: parseFloat(tripData.source_lng),
      },
    });

    dispatch({
      type: "SET_DESTINATION_LOCATION",
      payload: {
        lat: parseFloat(tripData.destination_lat),
        lng: parseFloat(tripData.destination_lng),
      },
    });
    setIsNavigate(false);
  };

  const handleCollectCash = () => {
    dispatch({
      type: "SET_SOURCE_LOCATION",
      payload: null,
    });

    dispatch({
      type: "SET_DESTINATION_LOCATION",
      payload: null,
    });
    setIsNavigate(false);
  };

  console.log("state ", state);

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-1 relative">
        <MapBlock />
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
        <Address add={loading ? "Loading..." : tripData.start_location} />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        {isNavigate && (
          <YellowButton text={"start trip"} onClick={handleClick} />
        )}
        {!isNavigate && (
          <YellowButton text={"collect Cash"} onClick={handleCollectCash} />
        )}
      </div>
    </div>
  );
};

const NavigationDriverPage = () => (
  <Suspense fallback={<LoadingOverlay />}>
    <NavigationDriverContent />
  </Suspense>
);

const NavigationDriverWrapper = () => (
  <AppProvider>
    <NavigationDriverPage />
  </AppProvider>
);

export default NavigationDriverWrapper;
