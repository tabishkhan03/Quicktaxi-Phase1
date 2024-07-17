import React from 'react'

//mui imports
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import BoyIcon from '@mui/icons-material/Boy';

function Header() {
  return (
    <header className="relative bg-gray-800  px-4 py-2 flex flex-col items-center justify-around" style={{ height: "25vh", backgroundImage: "url('https://storage.googleapis.com/pod_public/1300/181972.jpg')", backgroundSize: "cover", backgroundPosition: "center center" }}>
      <div className="absolute inset-0 bg-gray-200 opacity-70 z-0"></div> {/* Overlay */}
      
      {/* Content */}
      <div className="flex items-center justify-between w-full relative z-10">
        <DirectionsCarIcon fontSize="large" className="text-5xl" />
        <BoyIcon fontSize="large" className="text-5xl" />
      </div>
      
      {/* Additional Text */}
      <div className="w-full text-left z-10">
        <h3 className="text-lg font-bold">Welcome, Rider!</h3>
        <h1 className="text-2xl font-extrabold ">Find Taxis near You</h1>
      </div>
    </header>
  )
}

export default Header