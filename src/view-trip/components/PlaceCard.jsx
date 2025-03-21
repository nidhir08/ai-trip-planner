import { Button } from '@/components/ui/button'
import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function PlaceCard({activity}) {

  return (
    <div className='border rounded-2xl p-3 mt-2 flex flex-col-2 gap-5'>
     <img src={'/logo.jpg'} className='w-[130px] h-[130px] rounded-2xl'/>

     <div>
        <h2><b>Place Name:</b> {activity.place_name}</h2>
        <p><b>Place Detail:</b> {activity.place_details}</p>
        <h2><b>Time to Visit:</b> {activity.best_time_to_visit}</h2>
        <h2><b>Travelling Time:</b> {activity.time_travel}</h2>
        <h2><b>Ticket Price:</b> {activity.ticket_pricing}</h2>
        <h2><b>Rating:</b> {activity.rating}</h2>
        <Button className="bg-red-500">
        <Link to={'https://www.google.com/maps/search/?api=1&query='+activity.place_name+" "} target='_blank'>
        <FaLocationDot />
        </Link>
        </Button>
        





     </div>
    </div>
  )
}

export default PlaceCard