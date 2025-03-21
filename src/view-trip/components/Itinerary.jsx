import React from 'react'
import PlaceCard from './PlaceCard'

function Itinerary({trip}) {
  return (
    <div >
    <h2 className='text-2xl font-bold mt-2'>Places to Visit</h2>
    <div>
      {trip?.tripData?.daily_itinerary?.map((item,index)=>{
        return(
          <div>
            <h2 className='font-bold text-lg'>Day {item.day}</h2>
            {item.activities.map((activity,index)=>{
              return(
              <div className=' hover:scale-120 transition-all cursor-pointer'>
                <PlaceCard activity = {activity}/>
            {/* <h2><b>Place:</b>  {activity.place_name}</h2>
            <h2><b>Time to Visit:</b> {activity.best_time_to_visit}</h2> */}
            </div>
              )
            })}
          </div>
        )
        
      })}

    </div>
    </div>
  )
}

export default Itinerary