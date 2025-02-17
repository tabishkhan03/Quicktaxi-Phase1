"use client";
import { IoLocationSharp } from "react-icons/io5";
import {
  FaUser,
  FaPhoneAlt,
  FaCommentAlt,
  FaMapMarkerAlt,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import  {Toaster}  from "../components/notification-ui/Sonner";

import useFcmToken from "../../hooks/useFcmToken";

import NotificationManager from "../../hooks/NotificationManager";
const RideRequest = ({ request }) => {
  // const driver_id= localStorage.getItem("driver_id");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [driverId, setDriverID] = useState(localStorage.getItem("driver_id"));
  const { token, notificationPermissionStatus } = useFcmToken();
  console.log(driverId);
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
        title: "Trip accepted",
        message: "Ride Confirmed.",
        // link: "/contact",
      }),
    });

    const data = await response.json();
    console.log(data);
  };
  const handleAccept = async () => {
    setLoading(true);
    setError(null);
    console.log("request ", request);
    try {
      // console.log("driver id",driver_id)
      const response = await axios.put("/api/trips/accept-trip", {
        trip_id: request.trip_id,
        driver_id: driverId,
      });
      if (response.status === 200) {
        handleTestNotification();
        // alert("Trip accepted");

        const tripId = request.trip_id;
        // const driverId = driver_id;
        // router.push("/navigation-driver");
        router.push(
          `/navigation-driver?trip_id=${tripId}&driver_id=${driverId}`
        );
        // router.push({
        //   pathname: '/navigation-driver',
        //   query: {
        //     trip_id: request.trip_id,
        //     driver_id: request.driver_id
        //   },
        // });
      } else {
        throw new Error("Failed to accept the trip");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Ride Request</h2>
      </div>

      {request ? (
        <>
          <Toaster />
          <NotificationManager />
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <FaUser className="text-2xl text-gray-600" />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">Mark Smith</h3>
              <span className="text-sm text-gray-500">Cash Payment</span>
            </div>
            <div className="flex space-x-2">
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FaPhoneAlt className="text-gray-600" />
              </button>
              <button className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <FaCommentAlt className="text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-1" />
              <span>34 Km</span>
            </div>
            <div className="flex items-center">
              <FaClock className="mr-1" />
              <span>1h30m</span>
            </div>
            <div className="flex items-center">
              <FaRupeeSign className="mr-1" />
              <span>{request.fare}</span>
            </div>
          </div>

          <div className="bg-gray-100 rounded-lg p-3 mb-4">
            <div className="flex items-start mb-2">
              <div className="mt-1 mr-2">
                <IoLocationSharp className="text-yellow-400 text-xl" />
              </div>
              <p className="text-sm text-gray-700 flex-1">
                {request.start_location}
              </p>
            </div>
            <div className="flex items-start">
              <div className="mt-1 mr-2">
                <IoLocationSharp className="text-green-500 text-xl" />
              </div>
              <p className="text-sm text-gray-700 flex-1">
                {request.end_location}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button className="bg-gray-200 text-black py-2 px-8 rounded-full text-sm font-medium">
              Decline
            </button>
            <button
              className="bg-yellow-400 text-white py-2 px-8 rounded-full text-sm font-medium"
              onClick={handleAccept}
              disabled={loading}
            >
              {loading ? "Loading..." : "Accept"}
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-center text-gray-500 m-4">
            There are no rides available nearby you.
          </p>
        </>
      )}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
    </div>
  );
};

export default RideRequest;
