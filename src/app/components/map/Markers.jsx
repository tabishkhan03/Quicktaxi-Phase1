import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import { AppContext } from "../../../context/AppContext";
import { FaMapMarkerAlt } from "react-icons/fa";

import { IoCarSportSharp } from "react-icons/io5";

const Markers = () => {
  const { state } = useContext(AppContext);
  const { sourceLocation, destinationLocation,userLocation } = state;

  


  return (
    <>
    {userLocation && (
        <Marker
          longitude={userLocation.lng}
          latitude={userLocation.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <IoCarSportSharp size={35} style={{ color: "green" }} />
        </Marker>
      )}





      {sourceLocation && (
        <Marker
          longitude={sourceLocation.lng}
          latitude={sourceLocation.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
         <FaMapMarkerAlt size={25} style={{ color: "red" }} />
        </Marker>
      )}
      {destinationLocation && (
        <Marker
          longitude={destinationLocation.lng}
          latitude={destinationLocation.lat}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <FaMapMarkerAlt size={25} style={{ color: "blue" }} />
        </Marker>
      )}
    </>
  );
};

export default Markers;
