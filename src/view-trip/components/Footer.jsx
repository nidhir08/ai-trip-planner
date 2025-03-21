import { Button } from '@/components/ui/button'
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className='text-lg mt-8 text-center text-gray-400'>
        <h2>Created by Nidhi:AI Travel Planner App </h2>
        <div>
            <h2>Connect With Her</h2>
            <div className='flex flex-cols-3 gap-6 justify-center items-center mt-2'>
                <Button>
                    <Link to={'https://www.linkedin.com/in/nidhi-rawat-333721260/' } target="_blank">
                <FaLinkedin />
                </Link>
                </Button>

                <Button>
                <Link to={'https://github.com/nidhir08' } target="_blank">
                <FaGithub />
                   </Link> 
                </Button>

                <Button>
                <Link to={'mailto:nidhirawat519@gmail.com' } target="_blank">
                <BiLogoGmail />
                </Link>
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Footer