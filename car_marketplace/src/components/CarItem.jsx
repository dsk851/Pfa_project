import React from "react";
import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { SiSpeedtest } from "react-icons/si";
import { GoGear } from "react-icons/go";
import { MdOpenInNew } from "react-icons/md";

function CarItem({ car }) {
  return (
    <div className="relative w-[300px] sm:w-[200] hover:shadow-sm transition-all  shadow-md rounded-md ">
        <h2 className="absolute right-2 top-2 text-[10px] bg-emerald-400 text-white px-2 rounded-2xl">New</h2>
      <img
        src={car?.image}
        width={'100%'}
        height={250}
        alt="car_image"
        className="rounded-t-md  transition-all"
      />
      <div className="m-2 flex justify-between items-center">
        <h2 className="text-md text-start font-bold text-gray-900 mb-2">
          {car?.name}
        </h2>
      </div>
      <Separator />
      <div className="grid grid-cols-3 mt-2 mb-2">
        <div className="flex flex-col items-center gap-1">
          <LuFuel className="text-[12px] text-gray-500" />
          <h2 className="text-gray-800 text-[12px]">{car?.fuelType}</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <SiSpeedtest className="text-[12px] text-gray-500" />
          <h2 className="text-gray-800 text-[12px]">{car?.miles}</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
          <GoGear className="text-[12px] text-gray-500 " />
          <h2 className="text-gray-800 text-[12px]">{car?.gearType}</h2>
        </div>
      </div>
      <Separator />
      <div className="flex justify-between items-center m-2">
        <h2 className="text-md text-start font-bold text-gray-600 mb-2">
          ${car?.price}
        </h2>
        <div className="flex items-center p-2 rounded-md cursor-pointer">
  <h2 className="hidden sm:block text-[12px] font-bold text-blue-600 mr-2 hover:text-blue-400 transition-all">
    View details
  </h2>
  <MdOpenInNew className="text-[12px] text-blue-400" />
</div>
      </div>
    </div>
  );
}

export default CarItem;
