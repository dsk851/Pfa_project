import React from 'react'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router'

function Profile() {
  return (
    <div>
      <Header/>
      <div>
        <div className='flex items-center justify-between mt-5 mx-5'>
          <h2 className='text-xl md:text-3xl font-bold'>My listing</h2>
          <Link to={'/add-listing'}>
            <Button className='w-[100px] md:w-[200px] text-[10px] md:text-[15px]' > + Add new Listing</Button>
          </Link>
        </div>
      </div>
    </div>

  )
}

export default Profile