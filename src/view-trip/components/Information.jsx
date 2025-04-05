import { Button } from '@/components/ui/button'
import React from 'react'
import { IoIosSend } from "react-icons/io";
import { useState , useEffect} from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';

//const PHOTO_REF_URL= `https://maps.googleapis.com/maps/api/place/photo?maxHeight=1000&maxwidth=800&photo_reference={NAME}&key=`+ import.meta.env.VITE_API_KEY;
function Information({trip}) {
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
                        setPhotoUrl('/location.jpg')
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
        <img src= {photoUrl?photoUrl: '/location.jpg'} className='h-[500px] w-full object-cover rounded-2xl'/>
        <div className='my-5 flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
<div className='flex  flex-cols gap-6'>
            <div className='flex  flex-cols  gap-6 ' >
            <h2 className='p-1 px-4 bg-gray-200 rounded-full text-gray-600 text-l md:text-md'>📅 {trip?.userSelection?.noOfDays}Days</h2>
                <h2 className='p-1 px-4 bg-gray-200 rounded-full text-gray-600 text-l md:text-md'> 💸 Budget: {trip?.userSelection?.budget}</h2>
                <h2 className='p-1 px-4 bg-gray-200 rounded-full text-gray-600 text-l md:text-md'> 👱🏼 No. of traveler: {trip?.userSelection?.traveler}</h2>

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