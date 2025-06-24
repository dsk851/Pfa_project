import React from "react";
import { Separator } from "@/components/ui/separator";
import { LuFuel } from "react-icons/lu";
import { SiSpeedtest } from "react-icons/si";
import { GoGear } from "react-icons/go";
import { MdOpenInNew } from "react-icons/md";
import { Link } from "react-router";

function CarItem({ car }) {
  if (!car) {
    console.log("Pas de données de voiture reçues");
    return null;
  }

  return (
    <div className="bg-white hover:shadow-lg transition-all shadow-md rounded-lg overflow-hidden relative h-[380px] flex flex-col">
      {/* Badge New */}
      <div className="absolute right-3 top-3 z-20">
        <h2 className="text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-full font-medium">
          New
        </h2>
      </div>

      {/* Image Container - Taille fixe */}
      <div className="h-[200px] w-full overflow-hidden flex-shrink-0">
        <Link to={"/item/" + car?.id}>
          <img
            src={car?.images?.[0]?.imageUrl}
            alt="car_image"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/400x200?text=Car+Image";
            }}
          />
        </Link>
      </div>

      {/* Content Container - Hauteur flexible */}
      <div className="p-3 flex flex-col flex-1">
        {/* Title - Hauteur fixe */}
        <div className="h-12 mb-2 flex items-start">
          <h2 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
            {car?.title || "No title available"}
          </h2>
        </div>

        <Separator className="my-2" />

        {/* Specifications - Layout compact */}
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center text-center">
            <LuFuel className="text-base text-blue-500 mb-1" />
            <span className="text-[10px] text-gray-600 font-medium leading-tight">
              {car?.fuel_type || "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <SiSpeedtest className="text-base text-blue-500 mb-1" />
            <span className="text-[10px] text-gray-600 font-medium leading-tight">
              {car?.mileage ? `${car.mileage.toLocaleString()} km` : "N/A"}
            </span>
          </div>
          <div className="flex flex-col items-center text-center">
            <GoGear className="text-base text-blue-500 mb-1" />
            <span className="text-[10px] text-gray-600 font-medium leading-tight">
              {car?.transmission || "N/A"}
            </span>
          </div>
        </div>

        <Separator className="my-2" />

        {/* Price and CTA - Toujours en bas */}
        <div className="flex justify-between items-center mt-auto">
          <h2 className="text-lg font-bold text-gray-900">
            ${car?.selling_price ? car.selling_price.toLocaleString() : "0"}
          </h2>
          <Link
            to={"/item/" + car?.id}
            className="flex items-center space-x-1 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition-colors group"
          >
            <span className="text-xs font-semibold text-blue-600">Détails</span>
            <MdOpenInNew className="text-blue-500 text-xs group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarItem;
