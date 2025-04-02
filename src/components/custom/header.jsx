import React from 'react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import { googleLogout } from '@react-oauth/google';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { FcGoogle } from "react-icons/fc";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Header() {
  const user= JSON.parse(localStorage.getItem('user'));
  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.href = '/'; // Redirect to homepage after logout
  };
  const[dialog,setDialog]= useState(false);
  useEffect(()=>{
    console.log("user details are",user);
    console.log("User picture URL:", user?.picture);
  },[])
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      console.log(codeResponse); // This is where the access token is obtained
      GetUserProfile(codeResponse); // Call GetUserProfile with the token
    },
    onError:(error)=> console.log(error)
  })
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
      window.location.reload();
     
    })
  }
 
  return (
    <div className=' p-2 w-[100vw] overflow-hidden shadow-sm flex justify-between items-center '>
      <img src='/logo.svg' className='h-15 w-30'/>
     <div>
      {user ? (
      <div className='flex gap-5'>
          <a href='/createTrip'>
      <Button variant="outline" className="rounded-2xl">Create Trip</Button>
      </a>
        <a href='/my-trips'>
      <Button variant="outline" className="rounded-2xl">My Trips</Button>
      </a>
      <Popover>
  <PopoverTrigger>
    <img src={`${user?.picture}?sz=200`} className='h-[30px] w-[30px] rounded-full object-cover'/>
  </PopoverTrigger>
  <PopoverContent>
    <h2 className='cursor-pointer' onClick={()=>{
        googleLogout();
        localStorage.clear();
        window.location.href = '/';
      }}>Logout</h2>
  </PopoverContent>
</Popover>

        </div>
        )
        :(
        <Button onClick={()=>{
          setDialog(true);
        }} >Sign In</Button>
        )
        }
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
    </div>
  )
}

export default Header