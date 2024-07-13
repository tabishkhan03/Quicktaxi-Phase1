"use client";

import Autocomplete from "@/components/Autocomplete";
import MapBlock from "@/components/MapBlock.jsx";
// import MapPrac from "@/components/"
import { useState ,useEffect} from "react";

import { UserLocation } from "../../context/UserLocation.jsx";
import { SourceLocation } from "../../context/SourceLoation.jsx";
import { SourceDestination } from "../../context/SourceDestination.jsx";
import { Direction } from "../../context/Direction.jsx";
import Cardata from "@/components/carcard/Cardata.jsx";
import { IoIosHome } from "react-icons/io";
import { GiNotebook } from "react-icons/gi";
import { FaWallet } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";


const TOKEN = process.env.MAP_URL;

function App() {

  

  const getUserLocation=() =>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserlocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      })
    })
  }

useEffect(()=>{
  getUserLocation()
},[]);
  
  const[userlocation,setUserlocation] = useState({lng: 72.831581, lat: 19.141955});
  const[sourcelocation, setSourcelocation] = useState(null)
  const [destinationlocation, setDestinationlocation] = useState(null)
  const[direction,setDirection]=useState([])
  // {lng: 0, lat: 0}

  




 

  return (
    <>
      <div>
        <UserLocation.Provider value={{userlocation,setUserlocation}}>
          <SourceLocation.Provider  value={{sourcelocation,setSourcelocation}} >
          <SourceDestination.Provider value={{destinationlocation,setDestinationlocation}}>
          <Direction.Provider value={{direction,setDirection}}>

        {/* booking */}
        <div className="  flex justify-center  ">
          <div className=" fixed z-30 top-5 flex items-center gap-4 bg-orange-400 p-1 justify-center   md:w-[35%] rounded-2xl">
            <Autocomplete />
          </div>
        </div>
        {/* mappp */}
        <div>
          <div className="">
            <MapBlock  />
          </div>
        </div>
        {/* booking car */}
        <div className="">
          <Cardata/>
        </div>
        
        {/* footer */}
        <div className=" z-40  fixed bottom-0 w-[100%] text-center h-16 bg-gray-400">
          
          <div className="flex justify-between mx-6">
            {/* home */}
            <div className="flex flex-col items-center py-2">
              <h1 ><IoIosHome size={30 } className="text-yellow-400" /></h1>
              <h1 className="uppercase font-semibold text-sm text-yellow-400" >Home</h1>

            </div>
            {/* myTrip */}
            <div className="flex flex-col items-center py-2">
              <h1><GiNotebook size={30 } className="text-yellow-400" /></h1>
              <h1 className="uppercase font-semibold text-sm text-yellow-400" >My Trip</h1>

            </div>
            {/* wlallet */}
            <div className="flex flex-col items-center py-2">
              <h1><FaWallet size={30 } className="text-yellow-400"  /></h1>
              <h1 className="uppercase font-semibold text-sm text-yellow-400" >Wallet</h1>

            </div>
            {/* profile */}
            <div className="flex flex-col items-center py-2">
              <h1><CgProfile size={30 } className="text-yellow-400"  /></h1>
              <h1 className="uppercase font-semibold text-sm text-yellow-400" >Profile</h1>

            </div>


          </div>
        </div>
        </Direction.Provider>
        </SourceDestination.Provider>
        </SourceLocation.Provider>
        </UserLocation.Provider>

      </div>
    </>
  );
}

export default App;
