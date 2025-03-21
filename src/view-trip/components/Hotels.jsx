// import { Button } from '@/components/ui/button';
// import React from 'react'
// import { Link } from 'react-router-dom';

// function Hotels({trip}) {
//   const hotelImageURLs = trip?.tripData?.hotel_options;
//   return (
//     <div>
//         <h2 className='font-bold text-2xl'>Hotels Recommendation</h2>
//       <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10 '>
//         {trip?.tripData?.hotel_options?.map((item,index)=>{
            
//             return(
//                 <Link to={'https://www.google.com/maps/search/?api=1&query='+item.hotel_name+" "+item.hotel_address} target='_blank'>
//             <div className='grid bg-gray-200 rounded-2xl hover:scale-120 transition-all cursor-pointer '>
//                 {/* <img src='/location.jpg' className='rounded-2xl'/> */}
//                 {hotelImageURLs?.map((imageURL, index) => (
//                     <img
//                         key={index}
//                         src={imageURL}
//                         alt={`Hotel Image ${index + 1}`}
//                         className='w-[130px] h-[130px] rounded-2xl'
//                     />
//                 ))}
//                 <div className='text-center p-3'>
//                     <h2 className='font-bold'>{item.hotel_name}</h2>
//                     <h2 className='text-gray-600 font-medium'>{item.description}</h2>
//                     <h2 className='font-semibold my-2'>📍{item.hotel_address}</h2>
//                     <div className='flex flex-cols-2 gap-12 mt-5 mx-5 ' >
//                         <Button className='p-5 rounded-4xl px-3'>💵 {item.price_per_night}</Button>
//                         <Button className='p-5 rounded-4xl px-3'>⭐ {item.rating}</Button>

//                     </div>

//                 </div>
//                 </div>
//                 </Link>
//             );
            
//         })}
        
//       </div>
    

//     </div>
   
//   )
// }

// export default Hotels


import { Button } from '@/components/ui/button';
import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  const hotelImageURLs = trip?.tripData?.hotel_options?.map((hotel) => hotel.hotel_image_url);
  
  return (
    <div>
      <h2 className='font-bold text-2xl'>Hotels Recommendation</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-10'>
        {trip?.tripData?.hotel_options?.map((item, index) => {
          return (
            <Link
              to={`https://www.google.com/maps/search/?api=1&query=${item.hotel_name} ${item.hotel_address}`}
              target='_blank'
              key={index}
            >
              <div className='grid bg-gray-200 rounded-2xl hover:scale-120 transition-all cursor-pointer'>
                <img
                  src={item.hotel_image_url || '/location.jpg'}  // Using the hotel image or fallback
                  alt={`Hotel Image of ${item.hotel_name}`}
                  className='w-full h-[200px] object-cover rounded-t-2xl'
                  
                />
                <div className='text-center p-3'>
                  <h2 className='font-bold'>{item.hotel_name}</h2>
                  <h2 className='text-gray-600 font-medium'>{item.description}</h2>
                  <h2 className='font-semibold my-2'>📍{item.hotel_address}</h2>
                  <div className='flex flex-cols-2 gap-12 mt-5 mx-5'>
                    <Button className='p-5 rounded-4xl px-3'>💵 {item.price_per_night}</Button>
                    <Button className='p-5 rounded-4xl px-3'>⭐ {item.rating}</Button>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;
