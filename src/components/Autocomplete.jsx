import React, { useContext, useEffect, useState } from "react";
import { FaCircleDot } from "react-icons/fa6";
import { FaRegClock } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";
import { SourceDestination } from "../../context/SourceDestination";
import { SourceLocation } from "../../context/SourceLoation";
import { Userloc } from "../../context/Userloc";
import { Userdis } from "../../context/Userdis";

const Autocomplete = (confrim) => {
  const {location, setLocation} = useContext(Userloc);
  const [address, setAddress] = useState([]);
  const {location1, setLocation1} = useContext(Userdis);
  const [address1, setAddress1] = useState([]);

  const{sourcelocation, setSourcelocation} = useContext(SourceLocation)
  const {destinationlocation, setDestinationlocation} = useContext(SourceDestination)

  useEffect(() => {
    if (location) {
      getAdderess();
    } else {
      setAddress([]);
    }
    
  }, [location]);

  useEffect(() => {
    if (location1) {
      getAdderess1();
    } else {
      setAddress1([]);
    }
  }, [location1]);

  const getAdderess = async () => {
    const res = await fetch(
      "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?proximity=ip&types=address%2Cdistrict%2Ccountry&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setAddress(result);
  };
  const getAdderess1 = async () => {
    const res = await fetch(
        "https://api.mapbox.com/geocoding/v5/mapbox.places/"+location1+".json?proximity=ip&types=address%2Cdistrict%2Ccountry&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",

      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    setAddress1(result);
  };



  const handledel = () => {
    setLocation("");
    setAddress([]);
    setLocation1("");
    setAddress1([]);
   setSourcelocation(null)
    setDestinationlocation(null)
   
  };


  const onSourceLocationChange = async(item)=>{
    setLocation(item.place_name);
    setAddress([]);

    
    

    const response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+location+".json?proximity=ip&types=address%2Cdistrict%2Ccountry&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",{
        headers: {
          "Content-Type": "application/json",
        },
  
    })
    const result = await response.json();
    setSourcelocation({
        lng: result.features[0].geometry.coordinates [0],
        lat: result.features[0].geometry.coordinates[1],
        
  
    });
   



  }


  const onDestinationLocationChange = async(item)=>{
    setLocation1(item.place_name);
    setAddress1([]);
    const response = await fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/"+location1+".json?proximity=ip&types=address%2Cdistrict%2Ccountry&access_token=pk.eyJ1IjoicGF3YW4tc2luZ2giLCJhIjoiY2x5OG04czlhMGs3MzJqczdqZTQxdzdkMCJ9.9hJYde5isDb9oy7qQbI62g",{
        headers: {
          "Content-Type": "application/json",
        },
  
    })
    const result = await response.json();
    setDestinationlocation({
        lng: result.features[0].geometry.coordinates [0],
        lat: result.features[0].geometry.coordinates[1],
        
  
    });
    

  }
   

  console.log(sourcelocation)
  console.log(destinationlocation)


  const handlelocat = (e) => {
    setLocation(e.target.value);
    if (e.target.value.trim() === "") {
      setSourcelocation(null);
      setAddress([])
    }
    // if(e.target.value.trim() ===0){
    //   setAddress([])
    // }
  };

  const handlelocat1 = (e) => {
    setLocation1(e.target.value);
    if (e.target.value.trim() === "") {
      setDestinationlocation(null);
      setAddress1([])
    }

  } 
if(confrim === false){
  setAddress1([])
  setAddress([])
} 


    

  return (
    <div className="bg-slate-50 p-2 rounded-2xl">
      <div className="flex gap-6 items-center">
        <div>
          <FaCircleDot size={25} className="text-yellow-400" />
        </div>
        <div className=" relative">
          <input
            type="text"
            placeholder="Search for places"
            value={location}
            onChange={handlelocat}
            className="text-lg p-1 outline-0 bg-slate-50"
          />
          {address?.features ? (
            <div className="  absolute z-40 bg-white p-1">
              {address?.features.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSourceLocationChange(item)
                  }}
                >
                  <h1 className="p-1 cursor-pointer">{item.place_name}</h1>
                  <hr />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="">
          <FaRegClock
            size={35}
            className="bg-yellow-400 p-1 text-white rounded-lg "
          />
        </div>
      </div>
      <hr className="mt-1 mb-1 " />
      <div className="flex items-center gap-6">
        <div>
          <GrLocation size={28} className="text-green-500 " />
        </div>
        <div className=" relative">
          <input
            type="text"
            placeholder="Select your location"
            value={location1}
            onChange={handlelocat1}
            className="text-lg p-1 outline-0 bg-slate-50 w-full "
          />
          {address1?.features ? (
            <div className="  absolute left-0 top-11 bg-white p-1.5 rounded-xl">
              {address1?.features.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                   onDestinationLocationChange(item)
                  }}
                >
                  <h1 className="p-1 cursor-pointer">{item.place_name}</h1>
                  <hr />
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div>
          <RxCross1
            onClick={handledel}
            size={30}
            className="bg-orange-500 text-white rounded-3xl p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default Autocomplete;
