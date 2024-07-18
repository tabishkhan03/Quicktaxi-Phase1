"use client";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter,useSearchParams  } from "next/navigation";
import { AppContext, AppProvider } from "../../../context/AppContext";
import MapBlock from "../../components/MapBlock";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import Address from "../../components/Address";
import YellowButton from "@/components/YellowButton";

const NavigationDriverPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useContext(AppContext);
  const sourceLocation = "123, Street Avenue";
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip_id = searchParams.get('trip_id');
        const driver_id = searchParams.get('driver_id');
        
        if (trip_id && driver_id) {
          console.log("Fetching data with trip_id and driver_id:", trip_id, driver_id);

          const response = await axios.post(
            "http://localhost:3000/api/trips/confirmed-trip",
            {
              trip_id,
              driver_id,
            }
          );
          console.log(response.data);
          setTripData(response.data);
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

    fetchData();
  }, [searchParams]);

  const handleClick = () => {
    console.log("Start ride");
  };

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
        <Address add={sourceLocation} />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <YellowButton
          text={"Navigate to customer's location"}
          onClick={handleClick}
        ></YellowButton>
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
