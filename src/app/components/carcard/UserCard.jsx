import React, { useEffect, useContext, useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";
import { AppContext } from "../../../context/AppContext";
import RideConfirmed from "./RideConfirmed";
import { supabase } from "../../../utils/supabase";
import axios from "axios";

const UserCard = ({ setConfirm, setTripId, tripId }) => {
  const { state, dispatch } = useContext(AppContext);
  const { sourceName, destinationName } = state;
  const [cancel, setCancel] = useState("cancelled");

  const [tripStatus, setTripStatus] = useState(null);

  const handlecancel = async () => {
    setConfirm(false);

    try {
      const response = await axios.put("/api/customers/cancelride", {
        trip_id: tripId, // Assuming Tripid is part of the state
        status: cancel,
      });

      if (!response.status == 200) {
        const errorData = await response.data;
        throw new Error(errorData.error || "Failed to insert trip data");
      }

      const data = await response.data;
      console.log("Ride Cancel successfully:", data);
      // Handle success state or feedback to the user
    } catch (error) {
      console.error("Error inserting data:", error);
      // Handle error state or feedback to the user
    }
  };

  const checkTripStatus = async (tripId) => {
    try {
      const { data, error } = await supabase
        .from("Trip")
        .select("status")
        .eq("trip_id", tripId)
        .single();

      if (error) {
        console.error("Error fetching trip status:", error);
        return null;
      }

      return data.status; // Return the status value
    } catch (error) {
      console.error("Error in status check:", error);
      return null;
    }
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await checkTripStatus(tripId);
      if (status === "booked") {
        console.log("Trip status booked!");
        setTripStatus("booked");
        return clearInterval(interval);
      } else {
        console.log("Trip status not booked!");
        setTripStatus(status);
      }
    }, 5000); // Check every second

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [tripId]);

  return (
    <div>
      {tripStatus === "booked" ? (
        <RideConfirmed />
      ) : (
        <div className="absolute top-96 mt-20 w-[85%] mx-9 px-3 z-50 bg-slate-200 rounded-t-xl">
          <h1 className="text-center font-medium mt-3">Contacting Driver By</h1>
          <marquee
            behavior="scroll"
            scrollamount="50"
            direction="right"
            className="bg-slate-50 h-2 rounded-full"
          >
            <div className="bg-yellow-400 text-center w-52">p</div>
          </marquee>
          <div className="w-full flex flex-col justify-center items-center">
            <div className="mt-5">
              <p className="text-center p-10 bg-slate-300 w-28 rounded-full">
                .
              </p>
            </div>
            <button
              onClick={handlecancel}
              className="bg-yellow-400 px-4 py-1 shadow-2xl mt-4 text-md text-white rounded-2xl"
            >
              Cancel Ride
            </button>
          </div>
          <div className="w-full bg-slate-100 p-2 mt-4 mb-4 rounded-3xl flex flex-col gap-2 border-2 border-orange-400">
            <div className="flex gap-4 p-1">
              <FaCircleDot size={25} className="text-yellow-400" />
              <div>
                <h1 className="h-7 overflow-y-hidden">{sourceName}</h1>
              </div>
            </div>
            <hr className="border-1.5 border-black" />
            <div className="flex gap-4 p-1">
              <GrLocation size={28} className="text-green-500" />
              <div>
                <h1 className="h-7 overflow-y-hidden">{destinationName}</h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCard;
