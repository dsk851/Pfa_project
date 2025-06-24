import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Correction: import depuis react-router-dom
import { Button } from "@/components/ui/button";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import FormatResult from "./../../shared/Service";
import CarItem from "../../components/CarItem";
import { Skeleton } from "@/components/ui/skeleton"; // Pour un meilleur loading state
import  Delete  from "../../add-listing/components/Delete"; 

function MyListing() {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log("user", user);
  
  useEffect(() => {
    const GetUserCarListing = async () => {
      try {
        if (!user?.primaryEmailAddress?.emailAddress) return;

        const result = await db
          .select()
          .from(CarListing)
          .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
          .where(
            eq(CarListing.createdBy, user.primaryEmailAddress.emailAddress)
          )
          .orderBy(desc(CarListing.id));

        const resp = FormatResult(result);
        setCarList(resp);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      GetUserCarListing();
    }
  }, [user]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">My Listings</h2>
        <Link to={"/add-listing"} className="w-full sm:w-auto">
          <Button className="w-full sm:w-[200px]">+ Add New Listing</Button>
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
          ))}
        </div>
      ) : carList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-gray-500 text-lg mb-4">No listings found</p>
          <Link to={"/add-listing"}>
            <Button>Create Your First Listing</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5 ">
          {carList.map((item, index) => (
            <div key={index} className="flex justify-center">
              <div className="w-full max-w-[350px] my-4">
                <CarItem car={item} />
                <div className="mt-2 bg-gray-50 rounded-lg flex justify-between gap-3">
                  <Link
                    className="w-full"
                    to={"/add-listing?mode=edit&id=" + item?.id}
                  >
                    <Button variant="outline" className="w-full">
                      Edit
                    </Button>
                  </Link>
                  <Delete
                  id={item?.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyListing;
