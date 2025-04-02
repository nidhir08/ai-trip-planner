// import React from 'react'
// import PlaceCard from './PlaceCard'
// import { useEffect } from 'react';

// // 

// function Itinerary({ trip }) {
//   // Log the trip data to ensure it's being passed correctly
//   useEffect(() => {
//   }, [trip]);

//   const itinerary = trip?.tripData?.itinerary || trip?.tripData?.daily_itinerary;

//   return (
//     <div>
//       <h2 className='text-2xl font-bold mt-2'>Places to Visit</h2>
//       <div>
//         {/* Check if daily_itinerary exists and is not empty */}
//         {itinerary?.length > 0 ? (
//           itinerary.map((item, index) => (
//             <div key={index}>
//               <h2 className='font-bold text-xl'>Day {item.day}: {item.theme}</h2>

//               {/* Check if activities array exists and is not empty */}
//               <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5'>
//                 {item.activities && item.activities.length > 0 ? (
//                   item.activities.map((activity, idx) => (
//                     <div key={idx} className='hover:scale-120 transition-all cursor-pointer'>
//                       <PlaceCard activity={activity} />
//                     </div>
//                   ))
//                 ) : (
//                   <p>No activities for this day.</p> // Fallback message if no activities
//                 )}
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No itinerary data available.</p> // Fallback message if no itinerary data
//         )}
//       </div>
//     </div>
//   );
// }

// export default Itinerary;

import React, { useEffect, useState } from 'react';
import PlaceCard from './PlaceCard';

function Itinerary({ trip }) {
  const [normalizedDays, setNormalizedDays] = useState([]);
  const [hotels, setHotels] = useState([]);

  // Function to normalize the data into a common format with day structure
  const normalizeData = (tripData) => {
    const daysMap = new Map(); // Using a Map to preserve day order and group activities
    
    // Process itinerary data
    if (tripData?.daily_itinerary && Array.isArray(tripData.daily_itinerary)) {
      // Handle daily_itinerary format
      tripData.daily_itinerary.forEach((day, index) => {
        const dayNumber = index + 1;
        const dayActivities = day.activities || [];
        
        const activities = dayActivities.map(activity => ({
          place_name: activity.place_name,
          place_details: activity.place_details,
          ticket_pricing: activity.ticket_pricing,
          best_time_to_visit: activity.best_time_to_visit,
          time_travel: activity.time_travel,
          place_image_url: activity.place_image_url,
          rating: activity.rating || "No rating",
          duration: activity.duration,
          geo_coordinates: activity.geo_coordinates || {}
        }));
        
        daysMap.set(dayNumber, {
          day: dayNumber,
          theme: day.theme || `Day ${dayNumber}`,
          activities
        });
      });
    } else if (tripData?.itinerary && Array.isArray(tripData.itinerary)) {
      // Handle regular itinerary format
      tripData.itinerary.forEach((day, index) => {
        const dayNumber = index + 1;
        const dayActivities = day.activities || day.plan || [];
        
        const activities = dayActivities.map(activity => ({
          place_name: activity.place_name || activity.placeName,
          place_details: activity.place_details || activity.placeDetails,
          ticket_pricing: activity.ticket_pricing || activity.ticketPricing,
          best_time_to_visit: activity.best_time_to_visit || activity.bestTimeToVisit,
          time_travel: activity.time_travel || activity.timeTravel,
          place_image_url: activity.place_image_url || activity.placeImageUrl,
          rating: activity.rating || "No rating",
          duration: activity.duration,
          geo_coordinates: activity.geo_coordinates || activity.geoCoordinates || {}
        }));
        
        daysMap.set(dayNumber, {
          day: dayNumber,
          theme: day.theme || `Day ${dayNumber}`,
          activities
        });
      });
    }
    
    // Extract hotel options
    const hotelOptions = [];
    if (tripData?.hotel_options && Array.isArray(tripData.hotel_options)) {
      tripData.hotel_options.forEach(hotel => {
        hotelOptions.push({
          place_name: hotel.name || "Hotel",
          place_details: hotel.address || "",
          ticket_pricing: hotel.price || "",
          best_time_to_visit: "",
          time_travel: hotel.time_travel || "",
          rating: hotel.rating || "No rating",
          place_image_url: hotel.image_url || "",
          geo_coordinates: hotel.geo_coordinates || {},
          isHotel: true
        });
      });
    }
    
    // Convert Map to array of days
    return {
      days: Array.from(daysMap.values()),
      hotels: hotelOptions
    };
  };

  // Normalize the trip data on component mount or when trip data changes
  useEffect(() => {
    if (trip?.tripData) {
      const { days, hotels } = normalizeData(trip.tripData);
      setNormalizedDays(days);
      setHotels(hotels);
    }
  }, [trip]);

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mt-2">Places to Visit</h2>
      
      {normalizedDays.length > 0 ? (
        normalizedDays.map((day) => (
          <div key={day.day} className="mb-10">
            <h2 className="font-bold text-xl mb-4 bg-teal-100 p-3 rounded-lg border-l-4 border-teal-500">
              Day {day.day}: {day.theme}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
  {day.activities.map((activity, index) => (
    <div 
      key={index} 
      className=" flex flex-col hover:scale-105 transition-all cursor-pointer " 
    >
      {/* Wrapping PlaceCard in a container with a fixed height */}
      <div className="flex-grow ">
        <PlaceCard activity={activity} />
      </div>
    </div>
  ))}
</div>

          </div>
        ))
      ) : (
        <p className="text-gray-500 italic">No itinerary data available.</p>
      )}
      
      
    </div>
  );
}

export default Itinerary;