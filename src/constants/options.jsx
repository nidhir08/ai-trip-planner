export const SelectTravelList =[
    {
        id:1,
        title:"Just Me",
        desc:'A sole traveler in exploration',
        icon:' ✈️',
        people: '1'
    },
    {
        id:2,
        title:"Couple",
        desc:'Two travelers',
        icon:' 🥂',
        people: '2'

    },
    {
        id:3,
        title:"Family",
        desc:'A happy family',
        icon:' 🏡',
        people: '3 to 5'
    },
    {
        id:4,
        title:"Friends",
        desc:'Extra Fun Trip',
        icon:' 🏝️ ',
        people: '3 to 5'
    }
]
export const SelectBudget =[
    {
        id:1,
        title:"Cheap",
        desc:'Stay Conscious of costs',
        icon:' 💵',
    },
    {
        id:2,
        title:"Moderate",
        desc:'Keep cost at average side',
        icon:' 💰',
       

    },
    {
        id:3,
        title:"Luxury",
        desc:'Make the luxury trip',
        icon:' 🤑',
    }
]
export const AI_prompt = 'Generate Travel Plan for location :{location} for {totalDays} Days for {traveler} with a {budget} budget,give me Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time travel each of the location for {totalDays} days with each day plan with best time to visit in JSON format.'  