import Image from 'next/image'
import React from 'react'

function TopRideCard({imageURL, name, location, date}) {
  return (
    <div className="flex flex-col w-80 bg-white shadow-md overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <Image src={imageURL} layout="fill" objectFit="cover" alt={name} />
      </div>
      
      <div className="flex justify-between items-center bg-gray-300">

        <div className="pr-4 py-4 flex flex-col space-y-2">

          <div className="text-lg font-bold">{name}</div>
            <div className='flex gap-1 items-center'>
              <span className="text-gray-500">{location}</span>
              <span className="text-gray-400 text-sm">{date}</span>
            </div>
          </div>
        
        <div>
          <button className="m-4 py-2 px-5 bg-blue-500 text-white hover:bg-white hover:text-black">Book</button>
        </div>

      </div>
    </div>
  )
}

export default TopRideCard