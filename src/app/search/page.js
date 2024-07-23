import Navbar from "../components/nav-bar/index";

import { vehicles } from "../../db/db";
function SearchPage() {
  return (
    <div className="min-h-screen ">
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Divider */}
      <hr className="border-gray-400" />

      {/* Main Content */}
      <div className="p-4 flex flex-col space-y-4 ">
        {/* Left Side */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">Search & Book</h1>

          {/* Pick Up Location */}
          <div className="mb-4 font-bold ">
            <label htmlFor="pickup-location" className="text-lg mb-2 block ">
              Pick Up Location
            </label>
            <input
              type="text"
              id="pickup-location"
              name="pickup-location"
              className="border-2 border-gray-300 p-2 rounded w-full"
              placeholder="Enter pick up location"
            />
          </div>

          {/* Drop-off Location */}
          <div className="mb-4 font-bold">
            <label htmlFor="drop-off-location" className="text-lg mb-2 block ">
              Drop-off Location
            </label>
            <input
              type="text"
              id="drop-off-location"
              name="drop-off-location"
              className="border-2 border-gray-300 p-2 rounded w-full"
              placeholder="Enter drop-off location"
            />
          </div>

          {/* Select Vehicle Type */}
          {/* looping */}
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">Select Vehicle Type</p>
            <div className="flex space-x-4">
              {vehicles.map((Vehicle) => (
                <button
                  key={Vehicle}
                  className="p-2 bg-white text-black border-2 border-gray-800 rounded-md font-bold hover:bg-teal-900 hover:text-white focus:ring focus:ring-violet-300 focus:bg-teal-900 focus:text-white"
                >
                  {Vehicle}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          {/* Fare Estimate */}
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">Fare Estimate</p>
            <div className="bg-white text-black border-2 border-gray-500 rounded-md p-3 font-bold ">
              <p>
                Estimate Fare: <span className="font-semibold">$25.00</span>
              </p>
              <p>
                Distance: <span className="font-semibold">10 miles</span>
              </p>
              <p>
                Time: <span className="font-semibold">20 Minutes</span>
              </p>
            </div>
          </div>

          {/* Driver's Details */}
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">Driver&#39;s Details</p>
            <div className="flex items-center bg-white text-black rounded-md p-3">
              <img
                src="https://us.123rf.com/450wm/taronin/taronin1806/taronin180600031/104438443-cheerful-driver-in-a-cap-sits-in-the-car.jpg?ver=6"
                alt="Driver"
                className="rounded-full h-20 w-20 mr-4"
              />
              <div className="font-semibold">
                <ul>
                  <li>John Smith</li>
                  <li>Vehicle: Toyota Prius</li>
                  <li>Rating: 4.8</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Estimate Arrival Time */}
          <div className="mb-4">
            <p className="text-xl font-bold mb-2">Estimate Arrival Time</p>
            <p className="font-semibold">Driver will arrive in 5 minutes.</p>
          </div>
        </div>
      </div>

      {/* Confirm Booking */}
      <div className="flex items-center bg-blue-500 text-white justify-center h-24 ">
        <h1 className="text-2xl font-semibold ">Confirm Booking</h1>
      </div>
    </div>
  );
}

export default SearchPage;
