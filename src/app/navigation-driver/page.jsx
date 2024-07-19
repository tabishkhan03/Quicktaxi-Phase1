// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter, useSearchParams } from "next/navigation";
// import { AppContext, AppProvider } from "../../../context/AppContext";
// import MapBlock from "@/components/MapBlock";
// import Link from "next/link";
// import { FaArrowLeft } from "react-icons/fa";
// import Address from "../../components/Address";
// import YellowButton from "@/components/YellowButton";

// const NavigationDriverPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const { state, dispatch } = useContext(AppContext);
//   const [tripData, setTripData] = useState(null);

//   useEffect(() => {

//     const fetchData = async () => {
//       try {
//         const trip_id = searchParams.get("trip_id");
//         const driver_id = searchParams.get("driver_id");

//         if (trip_id && driver_id) {
//           console.log(
//             "Fetching data with trip_id and driver_id:",
//             trip_id,
//             driver_id
//           );

//           const response = await axios.post(
//             "http://localhost:3000/api/trips/confirmed-trip",
//             {
//               trip_id,
//               driver_id,
//             }
//           );
//           console.log("whole response ", response);
//           console.log("only data response ", response.data[0]);

//           const trip = response.data[0]; // Access the first item in the array

//           console.log("state ", state)
//           console.log("trip ", trip)

//           // Ensure trip exists and has the necessary properties
//           if (trip && trip.source_lat !== undefined && trip.source_lng !== undefined && trip.destination_lat !== undefined && trip.destination_lng !== undefined) {
//             console.log("data before setting trip data ",response.data[0])
//             setTripData(response.data[0]);
//             console.log("trip data state ",tripData)

            

//           } else {
//             console.error("Trip data is missing required location properties:", trip);
//           }
//         }
//       } catch (error) {
//         console.log("Something went wrong", error);
//       }
//     };

//     fetchData();
//   }, [searchParams]);

//   useEffect(()=>{
//     if (tripData) {
      
//       navigator.geolocation.getCurrentPosition((position) => {
//         const { latitude, longitude } = position.coords;
//         dispatch({
//           type: "SET_SOURCE_LOCATION",
//           payload: {
//             lat: latitude,
//             lng: longitude,
//           },
//         });
//       });
  
  
//       // dispatch({
//       //   type: "SET_SOURCE_LOCATION",
//       //   payload: {
//       //     lat: parseFloat(trip.source_lat),
//       //     lng: parseFloat(trip.source_lng),
//       //   },
//       // });
//       dispatch({
//         type: "SET_DESTINATION_LOCATION",
//         payload: {
//           lat: parseFloat(tripData?.destination_lat),
//           lng: parseFloat(tripData?.destination_lng),
//         },
//       });
//     }
//   },[state])



//   const handleClick = () => {
//     console.log("Start ride");
//     // Add navigation logic here if needed
//   };

//   return (
//     <div className="min-h-screen flex flex-col relative">
//       <div className="flex-1 relative">
//         <MapBlock />
//       </div>
//       <Link
//         href="/home-driver"
//         className="w-full p-4 absolute top-0 left-0 flex flex-row gap-x-2"
//       >
//         <FaArrowLeft className="text-black sm:text-3xl text-4xl" />
//       </Link>
//       <div className="w-full text-center absolute top-16 left-0 right-0 mx-auto">
//         <span className="font-bold text-black text-lg">Customer Location</span>
//       </div>
//       <div className="absolute bottom-24 left-4 right-4">
//         <Address add={tripData ? tripData.start_location : "Loading..."} />
//       </div>
//       <div className="absolute bottom-0 left-0 right-0">
//         <YellowButton
//           text={"Navigate to customer's location"}
//           onClick={handleClick}
//         />
//       </div>
//     </div>
//   );
// };

// const NavigationDriverWrapper = () => (
//   <AppProvider>
//     <NavigationDriverPage />
//   </AppProvider>
// );

// export default NavigationDriverWrapper;



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

  const setLocations=()=>{
    if (tripData) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        dispatch({
          type: "SET_SOURCE_LOCATION",
          payload: {
            lat: latitude,
            lng: longitude,
          },
        });
      });

      dispatch({
        type: "SET_DESTINATION_LOCATION",
        payload: {
          lat: parseFloat(tripData.destination_lat),
          lng: parseFloat(tripData.destination_lng),
        },
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trip_id = searchParams.get("trip_id");
        const driver_id = searchParams.get("driver_id");

        if (trip_id && driver_id) {
          console.log("Fetching data with trip_id and driver_id:", trip_id, driver_id);

          const response = await axios.post(
            "http://localhost:3000/api/trips/confirmed-trip",
            {
              trip_id,
              driver_id,
            }
          );

          const trip = response.data[0]; // Access the first item in the array

          console.log("state ", state);
          console.log("trip ", trip);

          if (
            trip &&
            trip.source_lat !== undefined &&
            trip.source_lng !== undefined &&
            trip.destination_lat !== undefined &&
            trip.destination_lng !== undefined
          ) {
            console.log("data before setting trip data ", response.data[0]);
            await setTripData(response.data[0]);
            setLocations();

          } else {
            console.error("Trip data is missing required location properties:", trip);
          }
        }
      } catch (error) {
        console.log("Something went wrong", error);
      }
    };

  fetchData();

  }, [searchParams]);



  const handleClick = () => {
    console.log("Start ride");
    // Add navigation logic here if needed
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex-1 relative">
        <MapBlock />
      </div>
      <Link href="/home-driver" className="w-full p-4 absolute top-0 left-0 flex flex-row gap-x-2">
        <FaArrowLeft className="text-black sm:text-3xl text-4xl" />
      </Link>
      <div className="w-full text-center absolute top-16 left-0 right-0 mx-auto">
        <span className="font-bold text-black text-lg">Customer Location</span>
      </div>
      <div className="absolute bottom-24 left-4 right-4">
        <Address add={tripData ? tripData.start_location : "Loading..."} />
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <YellowButton text={"Navigate to customer's location"} onClick={handleClick} />
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

