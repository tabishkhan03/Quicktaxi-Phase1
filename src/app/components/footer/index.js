import React from 'react'

//mui imports
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import SettingsIcon from '@mui/icons-material/Settings';

function Footer() {
  return (
    <div className="w-100 flex justify-around items-center bg-white py-2 sticky bottom-0 z-20">
        <div className='flex-col items-center text-center'>
            <HomeIcon />
            <p>Home</p>
        </div>

        <div className='flex-col items-center text-center'>
            <SearchIcon />
            <p>Search</p>
        </div>

        <div className='flex-col items-center text-center'>
            <CreditCardIcon />
            <p>Booking</p>
        </div>

        <div className='flex-col items-center text-center'>
            <SettingsIcon />
            <p>Setting</p>
        </div>
    </div>
  )
}

export default Footer