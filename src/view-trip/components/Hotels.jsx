import { Button } from '@/components/ui/button';
import React from 'react'

function Hotels({trip}) {
  return (
    <div>
        <h2 className='font-bold text-2xl'>Hotels Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10'>
        {trip?.tripData?.hotel_options?.map((item,index)=>{
            return(
            <div className='grid bg-gray-200 rounded-2xl '>
                <img src='/location.jpg' className='rounded-2xl'/>
                <div className='text-center p-3'>
                    <h2 className='font-bold'>{item.hotel_name}</h2>
                    <h2 className='text-gray-600 font-medium'>{item.description}</h2>
                    <h2 className='font-semibold my-2'>📍{item.hotel_address}</h2>
                    <div className='flex flex-cols-2 gap-12 mt-5 mx-5 ' >
                        <Button className='p-5 rounded-4xl px-3'>💵 {item.price_per_night}</Button>
                        <Button className='p-5 rounded-4xl px-3'>⭐ {item.rating}</Button>

                    </div>

                </div>
                </div>
            );
        })}
      </div>
    

    </div>
  )
}

export default Hotels