import React from 'react'
import { SignInButton } from '@clerk/clerk-react'
import { Button } from './components/ui/button'
import Header from './components/Header'
import Hero from './components/Hero'
import Category from './components/Category'
import MostSearchCar from './components/MostSearchCar'
import { Info } from 'lucide-react'
import InfoSection from './components/InfoSection'
import Footer from './components/Footer'

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
        {/* INFO SECTION */}
        <InfoSection />
        {/* FOOTER */}
        <Footer/>
    </div>
      
  )
}

export default Home