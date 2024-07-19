import React, { useState, useContext, useEffect } from 'react';
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import { MdOutlinePayment } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import Data from '../../app/data.js';
import { Direction } from '../../../context/Direction.jsx';
import { SourceDestination } from '../../../context/SourceDestination.jsx';
import { SourceLocation } from '../../../context/SourceLoation.jsx';
import { Userloc } from '../../../context/Userloc.jsx';
import { Userdis } from '../../../context/Userdis.jsx';
import { Canceltrip } from '../../../context/Canceltrip.jsx';

const Cardata = ({ setConfrim }) => {
  const [menu, setMenu] = useState(true);
  const { direction } = useContext(Direction);
  const { sourcelocation } = useContext(SourceLocation);
  const { destinationlocation } = useContext(SourceDestination);
  const { location } = useContext(Userloc);
  const { location1 } = useContext(Userdis);
  const [ready, setReady] = useState("Ready");
  const { Tripid, setTripid } = useContext(Canceltrip);
  const [driverData, setDriverData] = useState([]);

  const getCost = (charge) => {
    if (direction && direction.routes && direction.routes.length > 0) {
      const distanceInMiles = direction.routes[0].distance * 0.000621371192;
      return (charge * distanceInMiles).toFixed(2);
    } else {
      return '00.00'; // or handle the case when direction data is not available
    }
  };

  const fetchData = async () => {
    const res = await fetch('http://localhost:3000/api/drivers/alldrivers');
    const data = await res.json();
    const finalData = data.map((driver) => {
      return {
        driver: driver.name,
        name: driver.taxis[0].model,
        number: driver.taxis[0].number,
        charge: driver.taxis[0].charge,
        distance: driver.taxis[0].distance,
      };
    });
    setDriverData(finalData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBookTrip = async () => {
    try {
      const res = await fetch('/api/customer/bookTrip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_id: 1,
          driver_id: 2,
          taxi_id: 3,
          start_location: location,
          end_location: location1,
          source_lat : sourcelocation.lat,
          source_lng : sourcelocation.lng,
          destination_lat : destinationlocation.lat,
          destination_lng : destinationlocation.lng,
          start_time: new Date().toISOString(),
          status: ready,
        }),
      });

      const newTrip = await res.json();
      if (res.ok) {
        console.log('Trip booked successfully:', newTrip);
        setTripid(newTrip.trip.trip_id);
        setConfrim(true);
      } else {
        console.error('Error booking trip:', newTrip.error);
      }
    } catch (error) {
      console.error('Error booking trip:', error);
    }
  };

  const handleCancelTrip = async () => {
    try {
      const res = await fetch('/api/cancelTrip', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ trip_id: Tripid }),
      });

      const updatedTrip = await res.json();
      if (res.ok) {
        console.log('Trip canceled successfully:', updatedTrip);
      } else {
        console.error('Error canceling trip:', updatedTrip.error);
      }
    } catch (error) {
      console.error('Error canceling trip:', error);
    }
  };

  return (
    <div className="w-full">
      {sourcelocation && destinationlocation ? (
        <div className="z-10 w-full">
          {menu === false ? (
            <div className="absolute bottom-20 flex justify-center items-center w-full">
              <button onClick={() => setMenu(true)}>
                <SlArrowUp size={35} />
              </button>
            </div>
          ) : (
            <div className="absolute inset-x-0 mx-3 bottom-[175px] md:mx-5 bg-white shadow-2xl rounded-t-2xl">
              <div className="flex justify-center items-center cursor-pointer">
                <button onClick={() => setMenu(false)}>
                  <SlArrowDown size={35} />
                </button>
              </div>
              <div className="max-h-64 overflow-y-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {Data.map((cars, id) => (
                  <div
                    className="flex justify-between px-2 border-1.5px border-gray-200 py-2 hover:bg-yellow-300 relative"
                    key={id}
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
                <hr className='border-2 border-yellow-400' />
                <div className=' fixed bottom-20 w-[95%] mx-3 left-0 bg-slate-300 z-40 border-t-orange-500 border-orange-500'>
                  <div className='flex justify-between w-[70%] mx-auto'>
                    <div className='flex items-center gap-2'>
                      <MdOutlinePayment size={20} className='text-gray-500' />
                      <p className='text-lg font-medium'>Payment</p>
                    </div>
                    <p className='text-3xl font-light text-gray-400'>|</p>
                    <div className='flex items-center gap-2'>
                      <IoTicketSharp size={20} className='text-gray-500' />
                      <p className='text-lg font-medium'>Promo code</p>
                    </div>
                  </div>
                  <div className='w-full flex'>
                    <button onClick={handleBookTrip} className='bg-yellow-400 text-2xl text-white w-[90%] mx-auto py-3 text-center rounded-2xl'>Request</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Cardata;
