import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import carFeaturesData from "./../../shared/CarFeaturesData";
import DropdownField from "./DropdownField";

function CarFeatures() {
  return (
    <div className="mt-5 px-10">
      <h2 className="font-bold text-xl">Features list</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
        {carFeaturesData.carFeaturesData.map((item, index) => {
        return (
          <div key={index}>
            {item?.type === 'checkbox'? 
            <div className="flex justify-between items-center w-[300px]">
                <Checkbox /><h2 className="text-start w-[90%] font-bold">{item?.label}</h2>
            </div>: <h2 className="text-start w-[80%]">{item?.label}</h2> && item?.type === 'dropdown'? <DropdownField item={item}/>:null
            }
          </div>
        );
      })}
      </div>
    </div>
  );
}

export default CarFeatures;
