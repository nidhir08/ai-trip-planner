import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useState,useEffect } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


function PlaceCard({activity}) {
  const [photoUrl, setPhotoUrl] = useState(null); 
useEffect(() => {
            activity && GetPlacePhoto();
          }, [activity]);
          
    

        const GetPlacePhoto = async () => {
            try {
                const data = { textQuery: activity.place_name};
                const response = await GetPlaceDetails(data);
                console.log("Full API Response for", activity.place_name, response.data);
               //console.log("Full API Response:", response.data);
        
                if (response.data?.places?.length > 0) {
                    const place = response.data.places[0];
        
                    if (place.photos?.length > 0) {
                        console.log("Photos array for", activity.place_name, place.photos);

                        // Extract the correct photo reference
                        const photoReference = place.photos[0]?.name; 
                        
                        if (photoReference) {
                            // Ensure the correct format
                            const cleanedPhotoReference = photoReference.split('/photos/').pop();  
                            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=1000&maxwidth=800&photo_reference=${cleanedPhotoReference}&key=${import.meta.env.VITE_API_KEY}`;
        
                            console.log("Generated Photo URL for", activity.place_name, photoUrl);
        
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
    <div className='border rounded-2xl p-3 mt-2 flex flex-col-2 gap-5'>
     <img src={photoUrl || '/location.jpg'} className='w-[120px] h-[120px] rounded-2xl object-cover'/>

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