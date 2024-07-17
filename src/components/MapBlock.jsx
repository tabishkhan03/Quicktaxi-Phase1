"use client";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useContext, useEffect, useRef, useState } from "react";
import { UserLocation } from "../../context/UserLocation";
import Markers from "./map/Markers";
import { SourceDestination } from "../../context/SourceDestination";
import { SourceLocation } from "../../context/SourceLoation";
import { Direction } from "../../context/Direction";
import Routes from "./map/Routes";
import { Userloc } from "../../context/Userloc";
import { Userdis } from "../../context/Userdis";
//
function home() {
  const mapRef = useRef(null);
  const { userlocation, setUserloction } = useContext(UserLocation);
  const { sourcelocation, setSourcelocation } = useContext(SourceLocation);
  const { destinationlocation, setDestinationlocation } =
    useContext(SourceDestination);
  const { direction, setDirection } = useContext(Direction);
  const{location}=useContext(Userloc)
  const{location1}=useContext(Userdis)

  useEffect(() => {
    if(userlocation)
    {
      mapRef.current?.flyTo({
        center: [userlocation?.lng, userlocation?.lat],
        duration: 2500,
      });
    }
  }, [userlocation]);
  useEffect(() => {
    if(sourcelocation)
    {
      mapRef.current?.flyTo({
        center: [sourcelocation?.lng, sourcelocation?.lat],
        duration: 2500,
      });
    }
  }, [sourcelocation]);
  useEffect(() => {
    if (destinationlocation)  // if destinationlocation is not null, then get direction and fly to destination location
    {
      mapRef.current?.flyTo({
        center: [destinationlocation?.lng, destinationlocation?.lat],
        duration: 2500,
      });
    }

    if (sourcelocation && destinationlocation) {
      getDirection();
    }
  }, [destinationlocation]);

  const getDirection = async () => {
    const res = await fetch(
      "https://api.mapbox.com/directions/v5/mapbox/driving/" +
        sourcelocation.lng +
        "," +
        sourcelocation.lat +
        ";" +
        destinationlocation.lng +
        "," +
        destinationlocation.lat +
        "?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json()",
        },
      }
    );
    const result = await res.json();
    setDirection(result);
    console.log(result);
  };

  

  return (
    <div>
      <div>
        <Map
          ref={mapRef}
          mapboxAccessToken="pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5ZTBxdnc3MDlhZzJqczRrNjR0eGRuNSJ9.MH-QYcLcxHV_GhFvABfiNQ"
          initialViewState={{
            longitude: userlocation?.lng,
            latitude: userlocation?.lat,
            zoom: 14,
          }}
          style={{ width: "100%", height: "100vh" }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Markers />
          {direction?.routes&& sourcelocation&&destinationlocation ? (
            <Routes coordinates={direction?.routes[0].geometry.coordinates} />
          ) : null}
        </Map>
      </div>
    </div>
  );
}
export default home;
