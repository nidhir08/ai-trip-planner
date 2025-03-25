import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
function UserTripCard({trip}) {
           useEffect(() => {
               trip && GetPlacePhoto();
             }, [trip]);
             
       
       const [photoUrl, setPhotoUrl] = useState(null); 
           const GetPlacePhoto = async () => {
               try {
                   const data = { textQuery: trip?.userSelection?.location };
                   const response = await GetPlaceDetails(data);
           
                  // console.log("Full API Response:", response.data);
           
                   if (response.data?.places?.length > 0) {
                       const place = response.data.places[0];
           
                       if (place.photos?.length > 0) {
                           console.log("Photos array:", place.photos);
           
                           // Extract the correct photo reference
                           const photoReference = place.photos[0]?.name; 
                           
                           if (photoReference) {
                               // Ensure the correct format
                               const cleanedPhotoReference = photoReference.split("/").pop();  
                               const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxHeight=1000&maxwidth=800&photo_reference=${cleanedPhotoReference}&key=${import.meta.env.VITE_API_KEY}`;
           
                               console.log("Generated Photo URL:", photoUrl);
           
                               setPhotoUrl(photoUrl)
                           } else {
                               console.warn("No valid photo reference found.");
                           }
                       } else {
                           console.warn("No photos available in API response.");
                       }
                   } else {
                       console.warn("No places found for this query.");
                   }
               } catch (error) {
                   console.error("Error fetching place details:", error);
               }
           };
  return (
    <div>
        <Link to={'/viewTrip/'+trip.id} className='grid bg-gray-200 rounded-2xl hover:scale-120 transition-all cursor-pointer ' key={trip.id}> 
        <img src={photoUrl? photoUrl: '/location.jpg'} className=' object-cover rounded-2xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} trip with {trip?.userSelection?.budget} budget</h2>
        </div>
        </Link>
    </div>
  )
}

export default UserTripCard