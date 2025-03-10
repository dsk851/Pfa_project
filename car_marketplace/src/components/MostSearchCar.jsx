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

function MostSearchCar() {
  // console.log(FakerData.CarList);
  return (
    <div className="mt-5 min-h-[500px] border-t-2 border-b-2 border-gray-200">
      <h2 className="font-bold text-3xl text-center pt-10">
        Most Searched Cars
      </h2>
      <div className="mt-10 mx-24">
        <Carousel opts={{
    align: "start",
    loop: true,
  }}>
          <CarouselContent className="">
            {FakerData.CarList.map((car, index) => (
            <CarouselItem className="basis-1/2 sm:basis-1/3 md:basis-1/4 flex items-center justify-center">
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
