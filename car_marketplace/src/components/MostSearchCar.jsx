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
    <div className=" min-h-[500px] bg-gray-50">
      <h2 className="font-bold text-3xl text-center pt-10">
        Most Searched Cars
      </h2>
      <div className="mt-10 mx-20 md:mx-36">
        <Carousel opts={{
    align: "start",
    loop: true,
  }}>
          <CarouselContent className="min-h-[350px]">
            {FakerData.CarList.map((car, index) => (
            <CarouselItem className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex items-center justify-center">
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
