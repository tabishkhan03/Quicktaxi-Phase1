import React from 'react'
import Data from '../../app/data.js'
import { SlArrowUp } from "react-icons/sl";
import { SlArrowDown } from "react-icons/sl";
import { useState,useContext } from 'react';
import { Direction } from '../../../context/Direction.jsx';
import { SourceDestination } from '../../../context/SourceDestination.jsx';
import { SourceLocation } from '../../../context/SourceLoation.jsx';




const Cardata = () => {
    const [menu, setMenu] = useState(true);
    const{direction,setDirection}=useContext(Direction)
    const{sourcelocation, setSourcelocation} = useContext(SourceLocation)
    const {destinationlocation, setDestinationlocation} = useContext(SourceDestination)


    const getCost = (charge) => {
        if (direction && direction.routes && direction.routes.length > 0) {
          const distanceInMiles = direction.routes[0].distance * 0.000621371192;
          return (charge * distanceInMiles).toFixed(2);
        } else {
          return '00.00'; // or handle the case when direction data is not available
        }
      };



  return (
    <div>
        {
            sourcelocation&&destinationlocation  ?
         <div className="z-10 w-[100%]  ">
          {menu === false ? (
            <div className=" absolute bottom-20 flex justify-center items-center w-full ">
              <button onClick={() => setMenu(true)}>
                <SlArrowUp size={35} />
              </button>{" "}
            </div>
          ) : (
            <>
              <div className=" absolute w-[95%] mx-3  bottom-20 md:w-[95%] md:mx-5  bg-white shadow-2xl rounded-t-2xl">
                <div className="flex justify-center items-center cursor-pointer">
                  <button onClick={() => setMenu(false)}>
                    <SlArrowDown size={35} />
                  </button>
                </div>
                {Data.map((cars, id) => {
                  return (
                    <div
                      className=" flex justify-between px-2 border-[1.5px] border-gray-200 py-2  hover:bg-yellow-300 "
                      key={id}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 text-center text-xl">{cars.id}</div>
                        <div>
                          <p className="text-lg font-medium">{cars.name}</p>
                          <p className="text-green-400">{cars.distance}</p>
                        </div>
                      </div>
                      <div className="">
                        <p className="text-xl font-medium">{cars.number}</p>
                        <p className="text-green-400">rs.{getCost(cars.charge)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
        :null
        }
      
    </div>
  )
}

export default Cardata
