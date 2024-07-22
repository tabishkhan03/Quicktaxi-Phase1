"use client";

import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import Markers from "./map/Markers";
import Routes from "./map/Routes";

const Home = () => {
  const mapRef = useRef(null);
  const { state, dispatch } = useContext(AppContext);
  const { userLocation, sourceLocation, destinationLocation, direction } =
    state;

  useEffect(() => {
    if (userLocation?.lng && userLocation?.lat) {
      mapRef.current?.flyTo({
        center: [userLocation.lng, userLocation.lat],
        duration: 2500,
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (sourceLocation?.lng && sourceLocation?.lat) {
      mapRef.current?.flyTo({
        center: [sourceLocation.lng, sourceLocation.lat],
        duration: 2500,
      });
    }
  }, [sourceLocation]);

  useEffect(() => {
    if (destinationLocation?.lng && destinationLocation?.lat) {
      mapRef.current?.flyTo({
        center: [destinationLocation.lng, destinationLocation.lat],
        duration: 2500,
      });

      if (sourceLocation && destinationLocation) {
        getDirection();
      }
    } else {
      // Clear the direction or route state if destinationLocation is null or undefined
      dispatch({ type: "SET_DIRECTION", payload: null });
    }
  }, [destinationLocation, sourceLocation]);

  // const getDirection = async () => {
  //   const res = await fetch(
  //     `https://api.mapbox.com/directions/v5/mapbox/driving/${sourceLocation.lng},${sourceLocation.lat};${destinationLocation.lng},${destinationLocation.lat}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoibWFudml0aDUwNyIsImEiOiJjbHk4YTl1ejEwaDg2MnFxcGN6dnBpYmxjIn0.MYmf_2NaYmcEnQHhQWjhFA`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const result = await res.json();
  //   dispatch({ type: "SET_DIRECTION", payload: result });
  // };

  const getDirection = async () => {
    const res = await fetch(
      "https://api.mapbox.com/directions/v5/mapbox/driving/" +
        sourceLocation.lng +
        "," +
        sourceLocation.lat +
        ";" +
        destinationLocation.lng +
        "," +
        destinationLocation.lat +
        "?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json()",
        },
      }
    );
    const result = await res.json();
    dispatch({ type: "SET_DIRECTION", payload: result });
    console.log(result);
  };

  return (
    <div>
      <Map
        ref={mapRef}
        mapboxAccessToken="pk.eyJ1IjoibWFudml0aDUwNyIsImEiOiJjbHk4YTl1ejEwaDg2MnFxcGN6dnBpYmxjIn0.MYmf_2NaYmcEnQHhQWjhFA"
        initialViewState={{
          longitude: userLocation?.lng,
          latitude: userLocation?.lat,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Markers />
        {direction?.routes && (
          <Routes coordinates={direction.routes[0].geometry.coordinates} />
        )}
      </Map>
    </div>
  );
};

export default Home;
