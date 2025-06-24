import React, { use, useEffect, useState } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/Search";
import { db } from "../../configs";
import { CarImages, CarListing } from "../../configs/schema";
import { useSearchParams } from "react-router";
import { eq, and, lte, desc } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import CarItem from "@/components/CarItem";
import Footer from "@/components/Footer";
import FormatResult from "../shared/Service";

function SearchByOptions() {
  const [loading, setLoading] = useState(true);
  const [carList, setCarList] = useState([]);
  const [searchParams] = useSearchParams();
    const carStatus = searchParams.get("cars");
    const carMake = searchParams.get("make");
    const priceParam = searchParams.get("price");
    const all = searchParams.get("all");

  useEffect(() => {
    async function fetchCars() {
      try {
        setLoading(true);
        let query = db
          .select()
          .from(CarListing)
          .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
          .orderBy(desc(CarListing.selling_price));

        // Extraire le prix maximum si présent
        const maxPrice = priceParam?.match(/[\d,]+/) 
          ? parseInt(priceParam.match(/[\d,]+/)[0].replace(/,/g, "")) 
          : null;

        // Appliquer les filtres en fonction des paramètres
        if (carStatus && carMake && maxPrice) {
          query = query.where(
            and(
              eq(CarListing.type, carStatus),
              eq(CarListing.make, carMake),
              lte(CarListing.selling_price, maxPrice)
            ));
        } else if (carStatus && carMake) {
          query = query.where(
            and(eq(CarListing.type, carStatus), eq(CarListing.make, carMake))
          );
        } else if (carStatus && maxPrice) {
          query = query.where(
            and(
              eq(CarListing.type, carStatus),
              lte(CarListing.selling_price, maxPrice)
          ));
        } else if (carMake && maxPrice) {
          query = query.where(
            and(eq(CarListing.make, carMake), lte(CarListing.selling_price, maxPrice))
          );
        } else if (carStatus) {
          query = query.where(eq(CarListing.type, carStatus));
        } else if (carMake) {
          query = query.where(eq(CarListing.make, carMake));
        } else if (maxPrice) {
          query = query.where(lte(CarListing.selling_price, maxPrice));
        }

        const results = await query.execute();
        const formattedCars = FormatResult(results);
        setCarList(formattedCars);
      } catch (error) {
        console.error("Erreur lors de la récupération des voitures:", error);
        setCarList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mb-8 bg-gray-800 w-full">
        <SearchBar />
      </div>

      <div className=" mx-5 py-6">
        {/* Filtres appliqués */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {carStatus && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {carStatus}
              </span>
            )}
            {carMake && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {carMake}
              </span>
            )}
            {priceParam && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Prix max: {priceParam}
              </span>
            )}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-4">
                <Skeleton className="h-48 w-full mb-4" />
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3 mb-2" />
                <Skeleton className="h-10 w-full mt-4" />
              </div>
            ))}
          </div>
        ) : carList.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Aucune voiture ne correspond à vos critères
            </h2>
            <p className="text-gray-500 mb-6">
              Essayez d'élargir votre recherche ou de modifier vos critères.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {carList.length} résultat{carList.length > 1 ? "s" : ""} trouvé
                {carList.length > 1 ? "s" : ""}
              </p>
              <p className="text-gray-600 italic">Tri par prix décroissant</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {carList.map((car, index) => (
                // console.log(car) &&
                <CarItem key={index} car={car} />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer/>
    </div>
  );
}

export default SearchByOptions;