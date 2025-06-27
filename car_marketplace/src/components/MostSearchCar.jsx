import FakerData from "@/shared/FakeData";
import React from "react";
import CarItem from "./CarItem";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { db } from "../../configs";
import { CarImages, CarListing } from "../../configs/schema";
import { FormatResult } from "@/shared/Service";
import { desc, eq } from "drizzle-orm";
import { useEffect } from "react";

function MostSearchCar() {
  const [carList, setCarList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    GetPopularCarList();
  }, []);

  const GetPopularCarList = async () => {
    const result = await db
      .select()
      .from(CarListing)
      .leftJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
      .orderBy(desc(CarListing.id))
      .limit(10);

    const resp = FormatResult(result);
    console.log(resp);
    setCarList(resp);
    setLoading(false);
  };

  return (
    <div className="min-h-[400px] sm:min-h-[450px] md:min-h-[500px] bg-gray-50">
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-center pt-6 sm:pt-8 md:pt-10 px-4">
        Most Searched Cars
      </h2>
      <div className="mt-6 sm:mt-8 md:mt-10 mx-4 sm:mx-8 md:mx-20 lg:mx-36">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="min-h-[300px] sm:min-h-[320px] md:min-h-[350px]">
            {carList.map((car, index) => (
              <CarouselItem
                key={index}
                className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 flex items-center justify-center p-2 sm:p-3 md:p-4"
              >
                <CarItem car={car} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Boutons de navigation cachés sur très petits écrans */}
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </div>
  );
}

export default MostSearchCar;