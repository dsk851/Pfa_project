import React from "react";
import Search from "./Search";

function Hero() {
  return (
    <div>
      <div className="relative flex flex-col items-center p-20 pt-10 pt w-full h-[600px] gap-4 bg-[#eef0fc]">
        <h2 className="text-lg">Buy or Rent a Car Near You!</h2>
        <h2 className="text-[40px] text-center md:text-[60px] font-bold">
          FIND YOUR DREAM CAR
        </h2>
        <Search />
        <img
          src="/assets/hero_car_0.png"
          alt="hero_image"
          className="absolute bottom-0 w-2/3 pt-5 transform translate-y-[50px]"
        />
      </div>
    </div>
  );
}

export default Hero;
