import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';

function Hotels({trip}) {
  console.log("Trip Data:", trip); // Debugging
  console.log("Hotel Options:", trip?.tripData?.hotel_options); // Debugging
  return (
    <div>
        <h2 className='font-bold text-2xl py-4'>Hotels Recommendation</h2>
      <div className='grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-1 gap-10 '>
        {trip?.tripData.hotel_options.map((item,index)=>{
            return(
             <HotelCard item={item}/>
            );
            
        })}
        
      </div>
    

    </div>
   
  )
}

export default Hotels