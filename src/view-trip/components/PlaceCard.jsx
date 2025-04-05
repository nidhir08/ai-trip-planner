import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useState,useEffect } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';


// function PlaceCard({activity}) {
//   const [photoUrl, setPhotoUrl] = useState(null); 
// useEffect(() => {
//             activity && GetPlacePhoto();
//           }, [activity]);
          
    

//         const GetPlacePhoto = async () => {
//             try {
//                 const data = { textQuery: activity.place_name};
//                 const response = await GetPlaceDetails(data);
//                 console.log("Full API Response for", activity.place_name, response.data);
//                //console.log("Full API Response:", response.data);
        
//                 if (response.data?.places?.length > 0) {
//                     const place = response.data.places[0];
        
//                     if (place.photos?.length > 0) {
//                         console.log("Photos array for", activity.place_name, place.photos);

//                         // Extract the correct photo reference
//                         const photoReference = place.photos[0]?.name; 
                        
//                         if (photoReference) {
//                             // Ensure the correct format
//                             const cleanedPhotoReference = photoReference.split('/photos/').pop();  
//                             const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=1000&maxwidth=800&photo_reference=${cleanedPhotoReference}&key=${import.meta.env.VITE_API_KEY}`;
        
//                             console.log("Generated Photo URL for", activity.place_name, photoUrl);
        
//                             setPhotoUrl(photoUrl)
//                         } else {
//                             console.warn("No valid photo reference found.");
//                         }
//                     } else {
//                         console.warn("No photos available in API response.");
//                     }
//                 } else {
//                     console.warn("No places found for this query.");
//                 }
//             } catch (error) {
//                 console.error("Error fetching place details:", error);
//             }
//         };
//   return (
//     <div className='border rounded-2xl p-3 mt-2 flex flex-col-2 gap-5'>
//      <img src={photoUrl|| '/location.jpg'} className='w-[120px] h-[120px] rounded-2xl object-cover'/>

//      <div>
//         <h2><b>Place Name:</b> {activity.place_name}</h2>
//         <p><b>Place Detail:</b> {activity.place_details}</p>
//         <h2><b>Time to Visit:</b> {activity.best_time_to_visit}</h2>
//         <h2><b>Travelling Time:</b> {activity.time_travel}</h2>
//         <h2><b>Ticket Price:</b> {activity.ticket_pricing}</h2>
//         <h2><b>Rating:</b> {activity.rating}</h2>
//         <Button className="bg-red-500">
//         <Link to={'https://www.google.com/maps/search/?api=1&query='+activity.place_name+" "} target='_blank'>
//         <FaLocationDot />
//         </Link>
//         </Button>
        





//      </div>
//     </div>
//   )
// }

// export default PlaceCard


function PlaceCard({ activity }) {
    const [photoUrl, setPhotoUrl] = useState(null);
    const [normalizedActivity, setNormalizedActivity] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (activity) {
            // Activity should already be normalized by the parent component
            setNormalizedActivity(activity);
            setIsLoading(false);
        }
    }, [activity]);

    useEffect(() => {
        // Once we have normalized activity, fetch the photo
        if (normalizedActivity?.place_name) {
            fetchPlacePhoto(normalizedActivity.place_name);
        }
    }, [normalizedActivity]);

    const fetchPlacePhoto = async (placeName) => {
        try {
            const data = { textQuery: placeName };
            const response = await GetPlaceDetails(data);
            
            if (response.data?.places?.length > 0) {
                const place = response.data.places[0];

                if (place.photos?.length > 0) {
                    // Extract photo_reference from the 'name' field in the first photo
                    const photoReference = place.photos[0]?.name.split('/photos/').pop();

                    if (photoReference) {
                        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxheight=1000&maxwidth=800&photo_reference=${photoReference}&key=${import.meta.env.VITE_API_KEY}`;
                        setPhotoUrl(photoUrl);
                    } else {
                        setPhotoUrl('/location.jpg'); // Fallback
                    }
                } else {
                    setPhotoUrl('/location.jpg'); // Fallback
                }
            } else {
                setPhotoUrl('/location.jpg'); // Fallback
            }
        } catch (error) {
            console.error("Error fetching place details:", error);
            setPhotoUrl('/location.jpg'); // Fallback
        }
    };

    if (isLoading || !normalizedActivity) {
        return (
            <div className="border rounded-2xl p-5 mt-5 shadow-lg flex justify-center items-center h-[400px]">
                <div className="animate-pulse text-gray-500">Loading...</div>
            </div>
        );
    }

    // Use image from API or fallback to the one provided in the data
    const displayImage = photoUrl || normalizedActivity.place_image_url || '/location.jpg';
    
    return (
        <div className="border rounded-2xl p-5 mt-5 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl min-h-[400px] h-full">
            <div className="flex justify-center mb-4">
                <img
                    src={displayImage}
                    alt={normalizedActivity.place_name}
                    className="w-[150px] h-[150px] rounded-xl object-cover border-4 border-gray-200 hover:border-teal-500 transition-all duration-300"
                    onError={(e) => {
                        e.target.src = '/location.jpg'; // Fallback if image fails to load
                    }}
                />
            </div>

            <div className="text-gray-800">
                <h2 className="text-2xl font-semibold text-teal-600 mb-2">{normalizedActivity.place_name}</h2>
                <p className="text-sm text-gray-600 mb-2">{normalizedActivity.place_details}</p>

                <div className="text-sm text-gray-700 space-y-1">
                    {normalizedActivity.best_time_to_visit && (
                        <h3><b>Time to Visit:</b> {normalizedActivity.best_time_to_visit}</h3>
                    )}
                    {normalizedActivity.time_travel && (
                        <h3><b>Travelling Time:</b> {normalizedActivity.time_travel}</h3>
                    )}
                    {normalizedActivity.duration && (
                        <h3><b>Duration:</b> {normalizedActivity.duration}</h3>
                    )}
                    {normalizedActivity.ticket_pricing != null && (
                        <h3><b>Ticket Price:</b> {normalizedActivity.ticket_pricing}</h3>
                    )}
                    {normalizedActivity.rating && (
                        <h3><b>Rating:</b> {normalizedActivity.rating}</h3>
                    )}
                </div>

                <Button className="bg-teal-500 text-white font-semibold hover:bg-teal-400 transition-all mt-4 py-2 rounded-lg w-full">
                    <Link
                        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(normalizedActivity.place_name)}@${normalizedActivity.geo_coordinates.latitude},${normalizedActivity.geo_coordinates.longitude}`}
                        target='_blank'
                        className="flex items-center justify-center gap-2"
                    >
                        <FaLocationDot className="text-xl" />
                        View on Google Maps
                    </Link>
                </Button>
            </div>
        </div>
    );
}

export default PlaceCard;