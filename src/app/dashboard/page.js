"use client";
import Header from "../components/header";
import React, { useState } from "react";
import { topRides, localRides, categories } from "../../db";

//mui imports
import SearchIcon from "@mui/icons-material/Search";
import TopRideCard from "../components/topRideCard";
import LocalRideCard from "../components/localRideCard";
import Footer from "../components/footer";
import Category from "../components/categories";

function LandingPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="bg-gray-300 min-h-screen max-w-screen flex flex-col text-black">
      <Header />

      {/* Search bar */}
      <div className="m-4 flex justify-center items-center bg-blue-400">
        <input
          className="w-full p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Search for a taxi or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <SearchIcon className="text-white mx-3" />
      </div>

      {/*Top Rides*/}
      <div className="w-100 m-3 flex-col items-center justify-start">
        <h2 className="font-extrabold text-xl my-3 self-start">Top Rides</h2>
        <div className="w-100 flex gap-1 flex-wrap justify-center">
          {topRides.map((topRide, index) => (
            <TopRideCard
              key={index}
              imageURL={topRide.imageURL}
              name={topRide.name}
              location={topRide.location}
              date={topRide.date}
            />
          ))}
        </div>
      </div>

      {/*Local Rides*/}
      <div className="w-100 m-3 flex-col items-center justify-start">
        <h2 className="font-extrabold">Local Rides</h2>

        <div className="w-100 flex gap-1 flex-wrap justify-center">
          {localRides.map((localRide, index) => (
            <div className="w-40 p-2" key={index}>
              <LocalRideCard
                imageURL={localRide.imageURL}
                type={localRide.type}
                date={localRide.date}
                location={localRide.location}
              />
            </div>
          ))}
        </div>
      </div>

      {/*Categories*/}
      <div className="w-100 m-3 flex-col items-center justify-center">
        <h2 className="font-extrabold">Categories</h2>
        <div className="w-100 flex gap-1 flex-wrap justify-center">
          {categories.map((category, index) => (
            <Category name={category} key={index} />
          ))}
        </div>
      </div>

      {/*Footer*/}
      <Footer className="z-50" />
    </div>
  );
}

export default LandingPage;
