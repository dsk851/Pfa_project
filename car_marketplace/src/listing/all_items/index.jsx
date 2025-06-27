import React, { useEffect, useState } from "react";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { FormatResult } from "@/shared/Service";
import { eq, desc, sql } from "drizzle-orm";
import CarItem from "../../components/CarItem";
import Header from "@/components/Header";

function All_items() {
  const [carList, setCarList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const LIMIT = 10; 

  const fetchCars = async () => {
    setLoading(true);
    try {
      const offset = (page - 1) * LIMIT;

      
      const result = await db
        .select()
        .from(CarListing)
        .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
        .orderBy(desc(CarListing.id))
        .limit(LIMIT)
        .offset(offset);

      const totalCountRes = await db
        .select({ count: sql`COUNT(*)` })
        .from(CarListing);

      const totalCount = Number(totalCountRes[0].count);
      const totalPagesCalc = Math.ceil(totalCount / LIMIT);

      const formatted = FormatResult(result);
      setCarList(formatted);
      setTotalPages(totalPagesCalc);
    } catch (error) {
      console.error("Erreur récupération annonces:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, [page]);

  const handlePreviousPage = () => {
    setPage((p) => Math.max(p - 1, 1));
  };

  const handleNextPage = () => {
    setPage((p) => Math.min(p + 1, totalPages));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-10 pb-20 mt-15">
        <h2 className="pl-20 ml-15 font-bold text-3xl mb-8 sm:text-xl">All listing</h2>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-500">Loading...</p>
            </div>
          </div>
        ) : carList.length === 0 ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">No listing founded</p>
              <p className="text-gray-400 text-sm mt-2">
                Comme back later or click on the button in the top right corner
                to create your first listing...
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Grille des voitures */}
            <div className="mx-6 md:mx-20 lg:mx-36">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                {carList.map((car, index) => (
                  <div
                    key={`${car.id}-${index}`}
                    className="flex items-center justify-center"
                  >
                    <CarItem car={car} />
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Prev
                  </button>

                  <div className="flex items-center gap-2 mx-4">
                    <span className="sm:hidden text-gray-700 font-medium bg-white px-4 py-2 rounded-lg border border-gray-300">
                      Page {page} over {totalPages}
                    </span>
                    <span className="sm:block hidden text-gray-700 font-medium bg-white px-4 py-2 rounded-lg border border-gray-300">
                      {page} over {totalPages}
                    </span>
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm"
                  >
                    Next
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                <div className="text-sm text-gray-500 text-center sm:text-left">
                  Displaying {(page - 1) * LIMIT + 1} to{" "}
                  {Math.min(page * LIMIT, totalPages * LIMIT)} listings
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default All_items;
