import React, { useContext } from "react";
import { Marker } from "react-map-gl";
import { AppContext } from "../../../context/AppContext";
import { FaMapMarkerAlt } from "react-icons/fa";

const Markers = () => {
  const { state } = useContext(AppContext);
  const { sourceLocation, destinationLocation } = state;

  return (
    <>
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
