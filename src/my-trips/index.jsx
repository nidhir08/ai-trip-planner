import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react'
import { useEffect, useState } from 'react';
import { use } from 'react';
import { useNavigation } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';

function MyTrips() {
    const navigation = useNavigation();
    const[userTrips,setUserTrips]=useState([]); 
    useEffect(()=>{ 
        GetUserTrips()
    },[]) 
    const GetUserTrips=async()=>{
        const user= JSON.parse(localStorage.getItem('user'));

       console.log("User details are",user);
       
        if(!user){
            navigation('/');
            return;
        }

        const q = query(collection(db,'Trips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc)=>{
            console.log(doc.id, " => ", doc.data());
            setUserTrips( prevValue=>[...prevValue,doc.data()])
        })
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
        <h2 className='text-3xl font-bold text-center'>MyTrips</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-5'>
            {userTrips?.length>0?userTrips.map((trip,index)=>(
               <UserTripCard trip={trip} key={index}/>
            ))
            :[1,2,3,4,5,6].map((item,index)=>(
           
                    <div key={index}>

                    </div>
                
            ))
            }
        </div>
    
    </div>
  )
}

export default MyTrips