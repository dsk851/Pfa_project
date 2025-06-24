import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/Search'
import { useParams } from 'react-router' // Correction de l'import
import { db } from "../../../configs"
import { CarImages, CarListing } from "../../../configs/schema"
import { desc, eq } from "drizzle-orm"
import FormatResult from "../../shared/Service"
import CarItem from "../../components/CarItem"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Link } from "react-router" // Correction de l'import

function SearchByCategory() {
  const { category } = useParams()
  const [carList, setCarList] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalListings, setTotalListings] = useState(0)

  useEffect(() => {
    const fetchCategoryListings = async () => {
      try {
        setLoading(true)
        
        // Récupérer les annonces de la catégorie spécifiée
        const result = await db
          .select()
          .from(CarListing)
          .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
          .where(eq(CarListing.category, category))
          .orderBy(desc(CarListing.createdAt)) // Tri par date de création
        
        const formattedResults = FormatResult(result)
        setCarList(formattedResults)
        setTotalListings(formattedResults.length)
      } catch (error) {
        console.error("Error fetching category listings:", error)
      } finally {
        setLoading(false)
      }
    }

    if (category) {
      fetchCategoryListings()
    }
  }, [category])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-gray-700 py-2">
        <SearchBar />
      </div>

      <div className="container m-auto py-4">
        <div className="flex flex-col gap-2 mb-8">
          <h2 className="font-bold text-2xl md:text-4xl capitalize">
            {category} Cars
          </h2>
          <p className="text-gray-400">
            {loading ? 'Loading...' : `${totalListings} listing${totalListings !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
            ))}
          </div>
        ) : carList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
            <p className="text-gray-500 text-lg mb-4">No {category} cars found</p>
            <Link to="/" className="text-primary-dark">
              <Button>Browse All Cars</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {carList.map((item, index) => (
              <div key={index} className="flex justify-center">
                <div className="w-full max-w-[350px]">
                  <CarItem car={item} />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && carList.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link to="/">
              <Button variant="outline">View All Categories</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default SearchByCategory