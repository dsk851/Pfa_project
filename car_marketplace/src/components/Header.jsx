import React from 'react'
import { useUser, UserButton, SignInButton } from '@clerk/clerk-react'
import { Button } from './ui/button'
import { Link } from 'react-router'

function Header() {
    const {user, isSignedIn} = useUser()
  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <Link to={"/"}>
        <img
          src="/assets/logo.svg"
          alt="logo"
          width={30}
          height={20}
          className=""
        />
      </Link>

      <ul className="hidden md:flex gap-20">
        <Link to={"/"}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Home
          </li>
        </Link>
        <Link to={"/search"}>
          <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
            Search
          </li>
        </Link>

        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Listing
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary">
          Preowned
        </li>
      </ul>

      {isSignedIn ? (
        <div className="flex gap-5">
          <UserButton className="focus:outline-none" />
          <Link to={"/profil"}>
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-5">
          <SignInButton mode="modal" forceRedirectUrl="/">
            <Button>Sing In</Button>
          </SignInButton>
          <Link to={"/profil"}>
            <Button className="">Submit Listing</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header