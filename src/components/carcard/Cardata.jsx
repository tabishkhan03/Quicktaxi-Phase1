import React, { useState, useContext } from 'react';
import Data from '../../app/data.js';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { AppContext } from '../../../context/AppContext'; // Correct import for AppContext

const Cardata = () => {
  const [menu, setMenu] = useState(true);
  const { state } = useContext(AppContext); // Destructuring state from AppContext
  const { sourceLocation, destinationLocation, direction } = state; // Destructuring sourceLocation, destinationLocation, direction from state

  const getCost = (charge) => {
    if (direction && direction.routes && direction.routes.length > 0) {
      const distanceInMiles = direction.routes[0].distance * 0.000621371192;
      return (charge * distanceInMiles).toFixed(2);
    } else {
      return '00.00'; // Default value when direction data is not available
    }
  };

  return (
    <div className="w-full">
      {sourceLocation && destinationLocation ? (
        <div className="z-10 w-full">
          {menu === false ? (
            <div className="absolute bottom-20 flex justify-center items-center w-full">
              <button onClick={() => setMenu(true)}>
                <SlArrowUp size={35} />
              </button>
            </div>
          ) : (
            <div className="absolute inset-x-0 mx-3 bottom-20 md:mx-5 bg-white shadow-2xl rounded-t-2xl">
              <div className="flex justify-center items-center cursor-pointer">
                <button onClick={() => setMenu(false)}>
                  <SlArrowDown size={35} />
                </button>
              </div>
              {Data.map((cars, id) => (
                <div
                  className="flex justify-between px-2 border-1.5px border-gray-200 py-2 hover:bg-yellow-300"
                  key={id}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 text-center text-xl">{cars.id}</div>
                    <div>
                      <p className="text-lg font-medium">{cars.name}</p>
                      <p className="text-green-400">{cars.distance}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xl font-medium">{cars.number}</p>
                    <p className="text-green-400">rs.{getCost(cars.charge)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Cardata;
