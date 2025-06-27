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
import {FormatResult} from "@/shared/Service";
import { desc,eq } from "drizzle-orm";
import { useEffect} from "react";

function MostSearchCar() {
  const [carList, setCarList] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    GetPopularCarList();
  }, []);


  const GetPopularCarList = async () => {
    const result = await db.select().from(CarListing)
      .leftJoin(CarImages,eq(CarListing.id, CarImages.carListingId) )
      .orderBy(desc(CarListing.id))
      .limit(10);

    const resp = FormatResult(result);
    console.log(resp);
    setCarList(resp);
    setLoading(false);
  }
  return (
    <div className="min-h-[500px] bg-gray-50">
      <h2 className="font-bold text-3xl text-center pt-10">
        Most Searched Cars
      </h2>
      <div className="mt-10 mx-20 md:mx-36">
        <Carousel opts={{
    align: "start",
    loop: true,
  }}>
          <CarouselContent className="min-h-[350px] ">
            {carList.map((car, index) => (
            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/4 flex items-center justify-center p-4">    
                <CarItem key={index} car={car} />
            </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default MostSearchCar;
