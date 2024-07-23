import Image from 'next/image'
import React from 'react'

function LocalRideCard({imageURL, type, location, date}) {
  return (
    <div className="flex flex-col w-full bg-white shadow-md overflow-hidden relative">
      {/* Background Image Container */}
      <div
        className="relative h-60 overflow-hidden"
        style={{ 
          backgroundImage: `url(${imageURL})`, 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          opacity: 0.6, 
          zIndex: 0
        }}
      ></div>
      
      {/* Content */}
      <div className="absolute inset-0 top-20 flex flex-col items-center justify-center z-10">
        <div className="text-lg font-bold text-black">{type}</div>
        <div className="flex-col px-3 gap-1 items-center">
          <span className="text-gray-800">{location}</span>
          <span className="text-gray-800 text-sm">{date}</span>
        </div>
      </div>

    </div>

  )
}

export default LocalRideCard