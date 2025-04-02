import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-2xl py-4'>Hotels Recommendation</h2>
      <div className='grid md:grid-cols-2  lg:grid-cols-3 sm:grid-cols-1 gap-5 '>
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