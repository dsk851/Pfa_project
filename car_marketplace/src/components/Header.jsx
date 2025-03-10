import React from 'react'
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react'
import { Button } from './ui/button'


function Header() {
    const {user, isSignedIn} = useUser()
  return (
    <div className='flex justify-between items-center border-2 shadow-sm p-5'>
        <img src='/assets/logo.svg' alt="logo" width={30} height={20}/>

        <ul className='hidden md:flex gap-20'>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Home</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Search</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Listing</li>
            <li className='font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary'>Preowned</li>
        </ul>

        {isSignedIn ? (
            <div className='flex gap-5'>
                <UserButton className="focus:outline-none" />
                <Button>New post</Button>
            </div>
                
        ) : (
            <div className='flex gap-5'>
                <SignInButton mode='modal' forceRedirectUrl='/'>
                    <Button>Sing In</Button>
                </SignInButton>
                <Button className="bg-slate-600">New post</Button>
            </div>
        )}

    </div>
  )
}

export default Header