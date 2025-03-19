import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_prompt, SelectBudget, SelectTravelList } from '@/constants/options';
import { chatSession } from '@/service/AIMODAL';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { GoogleGenerativeAI } from "@google/generative-ai";
function CreateTrip() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const[formData,setFormData] = useState([]);

  
  
  const handleInputChange = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 2) {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${e.target.value}`
      );
      const data = await response.json();
      setResults(data);
    } else {
      setResults([]); // Clear results if the input is too short
    }
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place.display_name); // Set the place name as selected
    setQuery(place.display_name); // Set the input field to the selected place
    setResults([]); // Hide the results list
  
  setFormData((prevData) => ({
    ...prevData,
    location: place.display_name
  }));
};


const handleFormInput = (name, value) => {
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

  useEffect(()=>{
    console.log(formData);
  },[formData])

  const NoofDays =async()=>{
    if(formData?.noOfDays>10 && formData?.location|| formData?.budget||formData?.traveler ){
      toast("Event has been created");
    }else{
      toast('Please fill all the details')

    } 
    console.log(formData) ;

    const FINAL_PROMPT = AI_prompt
      .replace('{location}',formData?.location)
      .replace('{totalDays}',formData?.noOfDays)
      .replace('{traveler}',formData?.traveler)
      .replace('{budget}',formData?.budget)
      .replace('{totalDays}', formData?.noOfDays || '')
      

      console.log(FINAL_PROMPT);

    
    
  }
  

  return (
    <>
      <div className='text-left'>
        <h1 className='font-bold text-4xl my-8 '>Tell us your travel preferences 🏕️🌴</h1>
        <p className='mt-2 text-gray-500 text-xl'>
          Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
        </p>
      </div>
      <div>
        <div className='mt-10 text-left'>
          <h2 className='text-xl font-medium my-4'>What is destination of choice?</h2>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Search for a place..."
            className="border p-2 w-full"
          />
          {results.length > 0 && (
            <ul className="mt-2 border border-gray-300 rounded-lg">
              {results.map((result) => (
                <li
                  key={result.place_id}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectPlace(result)} // Handle selection
                >
                  {result.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className='mt-5 text-left'>
        <h2 className='text-xl font-medium my-4'>How many days are you planning your trip?</h2>
        <Input placeholder="Ex.3" type="number"  onChange={(e)=>handleFormInput('noOfDays',e.target.value)}/>
        </div>

        <div className='mt-5 text-left '>
        <h2 className='text-xl font-medium my-4'>What is Your Budget?</h2>
        <div className='flex '>
          {SelectBudget .map((item,index)=>{
            return(
            <div key={index}
            onClick={()=>handleFormInput('budget',item.title)}
             className={`p-6 text-l mx-10 border rounded-2xl hover:shadow-2xl text-center w-80
             ${formData?.budget == item.title && 'shadow-lg border-black'}
             `}>

              <h2 style={{ fontSize: '3rem' }}>{item.icon}</h2>
              <h2 className='font-extrabold'>{item.title}</h2>
              <h2>{item.desc}</h2>
              </div>
          )
          })}
        </div>

        </div>

        <div className='mt-5 text-left '>
        <h2 className='text-xl font-medium my-4'>Who do you plan on traveling with on your next adventure?</h2>
        <div className=' grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {SelectTravelList.map((item,index)=>{
            return(
              <div key={index}
              onClick={()=>handleFormInput('traveler',item.people)}
              className={`p-6 text-l mx-10 border rounded-2xl hover:shadow-2xl text-center w-80
                ${formData?.traveler == item.people && 'shadow-lg border-black'}
                `}>
                <h2 style={{ fontSize: '3rem' }}>{item.icon}</h2>
                <h2 className='font-extrabold'>{item.title}</h2>
                <h2>{item.desc}</h2>
              </div>
            )
          })}
        </div>

        </div>

        <div className=' mt-5 text-right'>
         <Button onClick={NoofDays}>Generate Trip!!</Button>
        </div>
      </div>
    </>
  );
}

export default CreateTrip;
