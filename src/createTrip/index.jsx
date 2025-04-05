import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_prompt, SelectBudget, SelectTravelList } from '@/constants/options';
import { chatSession } from '@/service/AIMODAL';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { BiLoaderAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState('');
  const[formData,setFormData] = useState([]);
  const[dialog,setDialog]= useState(false);
  const[loading,setLoading] = useState(false);

   const navigate = useNavigate();
  
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

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse); // This is where the access token is obtained
      GetUserProfile(codeResponse); // Call GetUserProfile with the token
    },
    onError:(error)=> console.log(error)
  })
  const NoofDays =async()=>{

    const user = localStorage.getItem('user');
    if(!user){
      setDialog(true);
      return;
    }

    if(formData?.noOfDays>10 && formData?.location|| formData?.budget||formData?.traveler ){
      toast("Event has been created");
    }else{
      toast('Please fill all the details')

    } 
    console.log(formData);
    setLoading(true);
    const FINAL_PROMPT = AI_prompt
      .replace('{location}',formData?.location)
      .replace('{totalDays}',formData?.noOfDays)
      .replace('{traveler}',formData?.traveler)
      .replace('{budget}',formData?.budget)
      .replace('{totalDays}', formData?.noOfDays || '')
      

      console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text())
    setLoading(false);
    SaveTrip(result?.response?.text());
    
  }
  
  const GetUserProfile = (tokenInfo) =>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
     headers:{
      Authorization: `Bearer ${tokenInfo?.access_token}`,
      Accept: 'Application/json'
     }
    }).then((resp)=>{
      console.log("called",resp);
      localStorage.setItem('user',JSON.stringify(resp.data));
      setDialog(false);
      NoofDays();
     
    })
  }

  const SaveTrip = async(TripData)=>{
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString()
    await setDoc(doc(db, "Trips" , docId),{
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id:docId

    });
    setLoading(false);
    // navigate('/viewTrip/'+docId);
    window.location.href = '/viewTrip/' + docId;

  }

  return (
    <>
    <div className='p-4'> 
      <div className='text-left '>
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
        <Input placeholder="Ex.3" type="number" 
        value={formData?.noOfDays || ''} 
        onChange={(e)=>handleFormInput('noOfDays',Number(e.target.value))}/>
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
         <Button disabled={loading} onClick={NoofDays}>
          {loading?
          <BiLoaderAlt className='h-7 w-7 animate-spin'/>: 'Generate Trip!!'
        }
          </Button>
        </div>
      </div>
      <Dialog open={dialog} onOpenChange={(open) => setDialog(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <img src ="/logo.svg" className='h-20 w-20'/>
            <h2 className='font-bold text-lg mt-6 text-black'>Sign In With Google</h2>
           <p className='my-2 text-l font-medium'> Sign in to the App with Google authentication securely</p> 
           <Button className="w-full mt-4 flex gap-5 items-center " onClick={login}>
           <FcGoogle  className='h-10 w-10'/>

            Sign In With Google</Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    </div>
    </>
      
  )
}

export default CreateTrip;
