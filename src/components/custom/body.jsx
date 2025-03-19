import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Body() {
  return (
    <div className="flex flex-col items-center mx-35">
    <h1 className='font-extrabold text-[60px] text-center mt-20'>
      <span className='text-[#f56551]'> Discover Your Next Trip With AI</span><br></br>Welcome to AI Trip Planner</h1>
      <p className='font-bold text-[30px] text-blue-800 mt-0'>Your personal trip planner with custom iternary within budget</p>
      <Link to={'/createTrip'}>
      <Button className='p-6 m-2 px-10'>Get Started</Button>
      </Link>
      <div className='w-full'>
      <img src='location.jpg' className="w-full object-cover box-border"/>

      </div>
      
    </div>
  )
}

export default Body