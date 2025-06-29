import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import {
  FaCalendarAlt,
  FaTachometerAlt,
  FaCogs,
  FaGasPump,
} from "react-icons/fa";

function HeaderDetails({ carDetails }) {
  console.log("carDetails", carDetails);

  return carDetails?.title &&
    carDetails?.year &&
    carDetails?.mileage &&
    carDetails?.transmission &&
    carDetails?.fuel_type &&
    carDetails?.updatedAt ? (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-6">
      
      <div className="px-4 py-6 flex flex-col">
        <h2 className="font-bold text-gray-900 mb-2 text-4xl">
          {carDetails.title}
        </h2>
        <span className="ml-2 text-[12px] text-gray-500">Posted on : {carDetails.updatedAt}</span>
        {carDetails.tagline && (
          <p className="text-blue-600 text-sm font-medium bg-blue-200 w-fit mt-2 px-3 py-1 rounded-full inline-block">
            {carDetails.tagline}
          </p>
        )}
      </div>

      {/* Spécifications principales */}
      <div className="px-4 py-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-gray-50 hover:bg-blue-50 rounded-lg p-3 transition-colors duration-200 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaCalendarAlt className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Year</p>
                <p className="text-sm font-bold text-gray-900">
                  {carDetails.year}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 hover:bg-blue-50 rounded-lg p-3 transition-colors duration-200 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaTachometerAlt className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Milleage</p>
                <p className="text-sm font-bold text-gray-900">
                  {parseInt(carDetails.mileage).toLocaleString()} km
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 hover:bg-blue-50 rounded-lg p-3 transition-colors duration-200 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaCogs className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">
                  Transmission
                </p>
                <p className="text-sm font-bold text-gray-900">
                  {carDetails.transmission}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 hover:bg-blue-50 rounded-lg p-3 transition-colors duration-200 group">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors duration-200">
                <FaGasPump className="text-blue-600 text-sm" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">fuel type</p>
                <p className="text-sm font-bold text-gray-900">
                  {carDetails.fuel_type}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-6">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-2/3 mb-6"></div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderDetails;
