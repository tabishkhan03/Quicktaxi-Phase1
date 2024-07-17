import React from 'react'
import { Marker } from 'react-map-gl'

import { SourceDestination } from '../../../context/SourceDestination'
import { SourceLocation } from '../../../context/SourceLoation'
import { UserLocation } from '../../../context/UserLocation'
import { useContext } from'react'
import { Userloc } from '../../../context/Userloc'
import { Userdis } from '../../../context/Userdis'



const Markers=()=>{
  const{userlocation,setUserloction}=useContext(UserLocation)
  const{sourcelocation, setSourcelocation} = useContext(SourceLocation)
  const {destinationlocation, setDestinationlocation} = useContext(SourceDestination)
  const{location}=useContext(Userloc)
  const{location1}=useContext(Userdis)
 

    return(
    <div>
      {/* <div>
      <Marker longitude={userlocation?.lng} latitude={userlocation?.lat} anchor="bottom" />
      
    
      </div> */}
       <div>

        {
           sourcelocation&&sourcelocation.lenghth !==0? (
            <Marker longitude={sourcelocation?.lng} latitude={sourcelocation?.lat} anchor="bottom" />
          )
          : null
        }
       </div>
       <div>
        {
          destinationlocation&&destinationlocation.lenghth!==0? (
            <Marker  longitude={destinationlocation?.lng} latitude={destinationlocation?.lat} anchor="bottom" />
          )
          : null
        }
       </div>
         

      

    </div>
  )






}

export default Markers
