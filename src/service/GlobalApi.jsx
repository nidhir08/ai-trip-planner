import axios from "axios"

const BASE_URL = `https://places.googleapis.com/v1/places:searchText` 
//const BASE_URL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json`
// const config={
//     header:{
//         'Content-Type':'application/json',
//         'X-Goog-Api-Key': import.meta.env.VITE_API_KEY,
//         'X-Goog-FieldMask':[
//             'places.photos',
//             'places.displayName',
//             'places.id'
//         ]
//     }
// }

// export const GetPlaceDetails = (data)=> axios.get(BASE_URL,data,config)
export const GetPlaceDetails = async (data) => {
    const apiKey = import.meta.env.VITE_API_KEY; // Ensure key is loaded
    const url = `https://places.googleapis.com/v1/places:searchText?key=${apiKey}`;

    try {
        const response = await axios.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                "X-Goog-Api-Key": apiKey, 
                "X-Goog-FieldMask": "places.displayName,places.photos"
            }
        });
        return response;
    } catch (error) {
        console.error("Error fetching place details:", error);
        throw error;
    }
};
 