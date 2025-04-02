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
            <div className="bg-gray-200 rounded-2xl hover:scale-105 transition-all cursor-pointer overflow-hidden shadow-lg transform hover:shadow-xl">
              <Link to={`/viewTrip/${trip.id}`} key={trip.id}>
                {/* Image Section */}
                <div className="relative">
                  <img 
                    src={photoUrl ? photoUrl : '/location.jpg'} 
                    alt={trip?.userSelection?.location || "Trip Image"} 
                    className="object-contain w-full h-full rounded-t-2xl transition-transform duration-300 hover:scale-110"
                  />
                </div>
                {/* Text Section */}
                <div className="p-5">
                  <h2 className="font-bold text-xl text-gray-800 truncate">{trip?.userSelection?.location}</h2>
                  <h3 className="text-sm text-gray-500 mt-1">
                    {trip?.userSelection?.noOfDays} day trip with a budget of {trip?.userSelection?.budget}
                  </h3>
                </div>
              </Link>
            </div>
          );
          
}

export default UserTripCard