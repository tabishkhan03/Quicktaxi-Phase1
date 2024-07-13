import React, { useState, useContext, useEffect } from 'react';
// import Data from '../../app/data.js';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { AppContext } from '../../../context/AppContext'; // Correct import for AppContext

const Cardata = () => {
  const [menu, setMenu] = useState(true);
  const { state } = useContext(AppContext); // Destructuring state from AppContext
  const { sourceLocation, destinationLocation, direction } = state; // Destructuring sourceLocation, destinationLocation, direction from state
  const [driverData, setDriverData] = useState([]);

  const getCost = (charge) => {
    if (direction && direction.routes && direction.routes.length > 0) {
      const distanceInMiles = direction.routes[0].distance * 0.000621371192;
      return (charge * distanceInMiles).toFixed(2);
    } else {
      return '00.00'; // Default value when direction data is not available
    }
  };

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/drivers/alldrivers');
    const data = await res.json();
    console.log("data", data);
    const finalData = data.map((driver) => {
      return {
        driver:driver.name,
        name:driver.taxis[0].model,
        number:driver.taxis[0].number,
        charge:driver.taxis[0].charge,
        distance:driver.taxis[0].distance,
      }
    })
    setDriverData(finalData);
  }

  useEffect(() => {
    fetchData()
  }, [])

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
              <div className="max-h-64 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {driverData.map((cars, id) => (
                  <div
                    className="flex justify-between px-2 border-1.5px border-gray-200 py-2 hover:bg-yellow-300"
                    key={id}
                    style={{ backgroundColor: id % 2 === 0 ? '#f0f0f0' : 'transparent' }} // Example of inline style
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 text-center text-xl">{id}</div>
                      <div>
                        <p className="text-lg font-medium">{cars.name}</p>
                        <p className="text-green-400">{cars.distance}</p>
                      </div>
                    </div>
                    <div className='flex flex-col items-center mx-2'>
                      <p className="text-xl font-medium">{cars.number}</p>
                      <p className="text-green-400">rs.{getCost(cars.charge)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Cardata;
