import React from 'react'
import { SignInButton } from '@clerk/clerk-react'
import { Button } from './components/ui/button'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchCar from './components/MostSearchCar'

function Home() {
  return (
    <div>

      {/* HEADER */}
        <Header />
      {/* HERO */}
        <Hero />
      {/* CATEGORIES*/}
        <Category />
      {/* MOST SEARCH CAR */}
        <MostSearchCar />
    </div>
      
  )
}

export default Home