import React from 'react'
import PlaceCard from './PlaceCard'
import { useEffect } from 'react';

// 

function Itinerary({ trip }) {
  // Log the trip data to ensure it's being passed correctly
  useEffect(() => {
  }, [trip]);

  const itinerary = trip?.tripData?.itinerary || trip?.tripData?.daily_itinerary;

  return (
    <div>
      <h2 className='text-2xl font-bold mt-2'>Places to Visit</h2>
      <div>
        {/* Check if daily_itinerary exists and is not empty */}
        {itinerary?.length > 0 ? (
          itinerary.map((item, index) => (
            <div key={index}>
              <h2 className='font-bold text-xl'>Day {item.day}: {item.theme}</h2>

              {/* Check if activities array exists and is not empty */}
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
                {item.activities && item.activities.length > 0 ? (
                  item.activities.map((activity, idx) => (
                    <div key={idx} className='hover:scale-120 transition-all cursor-pointer'>
                      <PlaceCard activity={activity} />
                    </div>
                  ))
                ) : (
                  <p>No activities for this day.</p> // Fallback message if no activities
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No itinerary data available.</p> // Fallback message if no itinerary data
        )}
      </div>
    </div>
  );
}

export default Itinerary;