import React from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/Search";
import { db } from "../../../configs";
import { CarImages, CarListing } from "../../../configs/schema";
import { useParams } from "react-router";
import { eq } from "drizzle-orm";
import { Skeleton } from "@/components/ui/skeleton";
import {FormatResult} from "../../shared/Service";
import HeaderDetails from "../components/HeaderDetails";
import CarImage from "../components/CarImage";
import Details from "../components/Details";
import Description from "../components/Description";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import OwnerDetails from "../components/OwnerDetails";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router";
import FinanceCalculator from "../components/FinanceCalculator";
import MostSearchCar from "@/components/MostSearchCar";



function SearchById() {
  const Navigate = useNavigate();
  const [data, setData] = React.useState([]);
  const { id } = useParams();
  const [carDetails, setCarDetails] = React.useState([]);

  const fetchData = async (id) => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .where(eq(CarListing.id, id));
    console.log("resulat", result);
    const resp = FormatResult(result);
    console.log("response formate 1", resp);

    setData((prevData) => ({
      ...prevData,
      email: resp[0]?.createdBy,
      fullName: resp[0]?.username,
      image: resp[0]?.userImageUrl,
      listing_title: resp[0]?.title,
    }));
    setCarDetails(resp[0]);
  };

  React.useEffect(() => {
    fetchData(id);
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col mt-10">
      <Header />


      <div className="flex-grow px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mt-4">
        
        <div className="mb-6">
          <HeaderDetails carDetails={carDetails} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            <div className="w-full">
              <CarImage carDetails={carDetails} />
            </div>

            <div className="w-full">
              <Details carDetails={carDetails} />
            </div>

            <div className="w-full">
              <FinanceCalculator carDetails={carDetails} />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">

            <div className="order-1 lg:order-none">
              <Pricing carDetails={carDetails} />
            </div>

            <div className="order-3 lg:order-none">
              <Description carDetails={carDetails} />
            </div>
            <div className="order-4 lg:order-none">
              <Features carDetails={carDetails} />
            </div>

            <div className="order-2 lg:order-none">
              <OwnerDetails data={data} />
            </div>
          </div>
        </div>

        <div className="mt-12 lg:mt-16"></div>
      </div>
      <MostSearchCar />
      <Footer />
    </div>
  );
}

export default SearchById;
