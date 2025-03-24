import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';

function HotelCard({item}) {
    useEffect(() => {
            item && GetPlacePhoto();
          }, [item]);
          
    
    const [photoUrl, setPhotoUrl] = useState(null); 
        const GetPlacePhoto = async () => {
            try {
                const data = { textQuery: item.hotel_name };
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
           <Link to={'https://www.google.com/maps/search/?api=1&query='+item.hotel_name+" "+item.hotel_address} target='_blank'>
            <div className='grid bg-gray-200 rounded-2xl hover:scale-120 transition-all cursor-pointer '>
                <img src={photoUrl} className='rounded-2xl'/>
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
                </Link>
    </div>
  )
}

export default HotelCard