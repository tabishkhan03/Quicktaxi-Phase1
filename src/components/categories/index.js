import React from 'react'

function Category({name}) {
  return (
    <div className="bg-white text-center text-black border-2 border-black py-1 px-7 flex flex-wrap hover:bg-black hover:text-white">
        {name}
    </div>
  )
}

export default Category;