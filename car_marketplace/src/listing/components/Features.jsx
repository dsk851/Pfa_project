import React from 'react';
import { CiCircleCheck } from "react-icons/ci";

function Features({ carDetails }) {
  return (
    <div className="flex flex-col shadow-md bg-white p-6 rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-1">Features</h2>
      <div className="grid lg:grid-cols-2 gap-1">
        {carDetails.features &&
          Object.entries(carDetails.features).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center bg-white text-sm font-medium px-2 rounded-full "
            >
              <CiCircleCheck className="text-blue-500 font-bold mr-2" />
              <span className="text-black">{key.split("_").join(" ")}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Features;
