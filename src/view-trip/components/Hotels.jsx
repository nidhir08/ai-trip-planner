import { Button } from '@/components/ui/button';
import React from 'react'
import { Link } from 'react-router-dom';
import HotelCard from './HotelCard';

function Hotels({trip}) {
  const hotelImageURLs = trip?.tripData?.hotel_options?.hotel_image_url;
  return (
    <div>
        <h2 className='font-bold text-2xl'>Hotels Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 '>
        {trip?.tripData?.hotel_options?.map((item,index)=>{
            
            return(
             <HotelCard item={item}/>
            );
            
        })}
        
      </div>
    

    </div>
   
  )
}

export default Hotels