import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';

function HotelCard({item}) {
    const [photoUrl, setPhotoUrl] = useState(null); 
    
    useEffect(() => {
            item && GetPlacePhoto();
          }, [item]);
          
    

        const GetPlacePhoto = async () => {
            try {
                const data = { textQuery: item?.hotel_name };
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
                            const cleanedPhotoReference = photoReference.split('/').pop();  
                            const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=1000&maxwidth=800&photo_reference=${cleanedPhotoReference}&key=${import.meta.env.VITE_API_KEY}`;
        
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
           <div className=" bg-gray-100 rounded-2xl hover:scale-105 transition-all cursor-pointer shadow-md hover:shadow-lg overflow-hidden  flex flex-col  min-h-[400px] h-full">
  <img src={photoUrl ? photoUrl : '/location.jpg'} className="rounded-t-2xl h-56 w-full object-cover" />
  <div className="text-center p-4">
    <h2 className="font-bold text-lg text-gray-800">{item.hotel_name}</h2>
    <div className="text-gray-500 text-sm overflow-hidden text-ellipsis whitespace-nowrap">{item.description}</div>
    <div className="font-semibold my-2 text-gray-700  gap-1 overflow-hidden text-ellipsis whitespace-nowrap">
      📍 {item.hotel_address}
    </div>
    <div className="flex justify-center gap-5 mt-4">
      <Button className="p-3 px-5 rounded-full bg-green-500 text-white shadow-md hover:bg-green-600">
        💵 {item.price_per_night}
      </Button>
      <Button className="p-3 px-5 rounded-full bg-yellow-400 text-white shadow-md hover:bg-yellow-500">
        ⭐ {item.rating}
      </Button>
    </div>
  </div>
</div>

                </Link>
    </div>
  )
}

export default HotelCard