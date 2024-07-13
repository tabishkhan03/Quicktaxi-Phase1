import React, { useContext, useEffect, useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { AppContext } from "../../context/AppContext";


const Autocomplete = () => {
  const [sourceQuery, setSourceQuery] = useState("");
  const [destinationQuery, setDestinationQuery] = useState("");
  const [sourceResults, setSourceResults] = useState([]);
  const [destinationResults, setDestinationResults] = useState([]);

  const { state, dispatch } = useContext(AppContext);
  const { sourceLocation, destinationLocation } = state;

  useEffect(() => {
    if (sourceQuery) {
      const timer = setTimeout(() => {
        fetchLocations(sourceQuery, setSourceResults);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setSourceResults([]);
    }
  }, [sourceQuery]);

  useEffect(() => {
    if (destinationQuery) {
      const timer = setTimeout(() => {
        fetchLocations(destinationQuery, setDestinationResults);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setDestinationResults([]);
    }
  }, [destinationQuery]);

  const fetchLocations = async (query, setResults) => {
    try {
      const res = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?proximity=ip&types=address%2Cdistrict%2Ccountry&access_token=pk.eyJ1IjoibWFudml0aDUwNyIsImEiOiJjbHk4YTl1ejEwaDg2MnFxcGN6dnBpYmxjIn0.MYmf_2NaYmcEnQHhQWjhFA`
      );
      const result = await res.json();
      setResults(result.features || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleSourceLocationSelect = (item) => {
    setSourceQuery(item.place_name);
    setSourceResults([]);
    dispatch({
      type: "SET_SOURCE_LOCATION",
      payload: {
        lng: item.geometry.coordinates[0],
        lat: item.geometry.coordinates[1],
      },
    });
  };

  const handleDestinationLocationSelect = (item) => {
    setDestinationQuery(item.place_name);
    setDestinationResults([]);
    dispatch({
      type: "SET_DESTINATION_LOCATION",
      payload: {
        lng: item.geometry.coordinates[0],
        lat: item.geometry.coordinates[1],
      },
    });
  };

  const clearLocations = () => {
    setSourceQuery("");
    setDestinationQuery("");
    setSourceResults([]);
    setDestinationResults([]);
    dispatch({ type: "SET_SOURCE_LOCATION", payload: null });
    dispatch({ type: "SET_DESTINATION_LOCATION", payload: null });
  };

  return (
    <div className="bg-slate-50 p-2 rounded-2xl">
      <div className="flex gap-6 items-center">
        <div>
          <FaCircleDot size={25} className="text-yellow-400" />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for places"
            value={sourceQuery}
            onChange={(e) => setSourceQuery(e.target.value)}
            className="text-lg p-1 outline-0 bg-slate-50"
          />
          {sourceResults.length > 0 && (
            <div className="absolute z-40 bg-white p-1">
              {sourceResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSourceLocationSelect(item)}
                  className="p-1 cursor-pointer"
                >
                  {item.place_name}
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <FaRegClock size={35} className="bg-yellow-400 p-1 text-white rounded-lg" />
        </div>
      </div>
      <hr className="mt-1 mb-1" />
      <div className="flex items-center gap-6">
        <div>
          <GrLocation size={28} className="text-green-500" />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Select your location"
            value={destinationQuery}
            onChange={(e) => setDestinationQuery(e.target.value)}
            className="text-lg p-1 outline-0 bg-slate-50 w-full"
          />
          {destinationResults.length > 0 && (
            <div className="absolute left-0 top-11 bg-white p-1.5 rounded-xl">
              {destinationResults.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleDestinationLocationSelect(item)}
                  className="p-1 cursor-pointer"
                >
                  {item.place_name}
                  <hr />
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <RxCross1
            onClick={clearLocations}
            size={30}
            className="bg-orange-500 text-white rounded-3xl p-2 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;

