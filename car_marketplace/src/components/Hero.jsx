import React from "react";
import Search from "./Search";

function Hero() {
  return (
    <div>
      <div className="relative flex flex-col items-center px-4 sm:px-8 md:px-20 pt-6 sm:pt-8 md:pt-10 w-full h-[400px] sm:h-[500px] md:h-[600px] gap-2 sm:gap-3 md:gap-4 bg-[#eef0fc]">
        <h2 className="text-sm sm:text-base md:text-lg">
          Buy or Rent a Car Near You!
        </h2>
        <h2 className="text-xl sm:text-2xl md:text-[30px] lg:text-[60px] font-bold text-center leading-tight">
          FIND YOUR DREAM CAR
        </h2>
        <Search />
        {/* Image masquée sur mobile, visible sur tablette et desktop */}
        <img
          src="/assets/hero_car_0.png"
          alt="hero_image"
          className="hidden md:block absolute bottom-0 md:w-2/3 pt-5 transform lg:translate-y-[100px] transition-all"
        />
      </div>
    </div>
  );
}

export default Hero;
