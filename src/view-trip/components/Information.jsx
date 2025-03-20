import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";
function Information({trip}) {
  return (
    <div>
        <img src= '/location.jpg' className='h-[500px] w-full object-cover rounded-2xl'/>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
<div className='flex  flex-cols gap-6'>
            <div className='flex  flex-cols  gap-6 ' >
            <h2 className='p-1 px-4 bg-gray-200 rounded-full text-gray-600 text-l md:text-md'>📅{trip.userSelection?.noOfDays}Days</h2>
                <h2 className='p-1 px-4 bg-gray-200 rounded-full text-gray-600 text-l md:text-md'> 💸 Budget: {trip.userSelection?.budget}</h2>
                <h2 className='p-1 px-4 bg-gray-200 rounded-full text-gray-600 text-l md:text-md'> 👱🏼 No. of traveler: {trip.userSelection?.traveler}</h2>

            </div>
        
        <Button>
        <IoIosSend />
        </Button>
        </div>
    </div>

    </div>
  )
}

export default Information