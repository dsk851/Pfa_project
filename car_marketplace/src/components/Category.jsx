import {
  FaCar,
  FaTruck,
  FaMotorcycle,
  FaBus,
  FaTaxi,
  FaShuttleVan,
  FaCarSide,
} from "react-icons/fa";

import React from "react";
import Data from "@/shared/Data";
import { Link } from "react-router";

function Category() {
  return (
    <div className="mt-10 sm:mt-20 md:mt-40 min-h-[250px] sm:min-h-[300px] px-2 sm:px-4 md:px-25">
      <h2 className="font-bold text-xl sm:text-2xl md:text-3xl text-center pt-6 sm:pt-8 md:pt-10">
        Browse By Categories
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-5 px-2 sm:px-4 md:px-5 mt-6 sm:mt-8 md:mt-10">
        {Data.Categories.map((category) => (
          <Link to={"search/" + category.name} key={category.id}>
            <div className="border-2 border-gray-200 p-2 sm:p-3 md:p-5 rounded-md flex flex-col items-center gap-1 sm:gap-2 cursor-pointer hover:shadow-lg hover:border-2 transition-all text-black">
              <div className="text-lg sm:text-2xl md:text-3xl lg:text-[40px]">
                {category.icon}
              </div>
              <h2 className="text-xs sm:text-sm md:text-base text-center leading-tight">
                {category.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Category;
