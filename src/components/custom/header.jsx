import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-4'>
      <img src='/logo.svg' className='h-15 w-30'/>
     <div>
      <Button>Sign In</Button>
     </div>
    </div>
  )
}

export default Header