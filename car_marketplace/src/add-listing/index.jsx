import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import carDetailsData from "./../shared/carDetailsData";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Checkbox } from "@/components/ui/checkbox";
import React from "react";
import carFeaturesData from "./../shared/CarFeaturesData";

function Add_listing() {
  return (
    <div>
      <Header/>
        <h2 className="font-bold text-xl md:text-3xl mt-5 mx-5">Add New Listing</h2>
        <form
          action=""
          className="mt-5 border-2 border-gray-200 p-5 rounded-2xl">
          {/* CARS DETAILS */}
          <div className="my-5 px-10">
            <h2 className="font-bold text-xl">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 transition-all">
              {carDetailsData.carDetailsData.map((item, index) => {
                return (
                  <div key={index} className="m-1">
                    <label className="text-sm font-bold">
                      {item?.label}{" "}
                      {item.required && (
                        <span className="text-red-700 font-bold">*</span>
                      )}
                    </label>
                    {item.type === "text" || item.type === "number" ? (
                      <InputField item={item} />
                    ) : item.type === "select" ? (
                      <DropdownField item={item} />
                    ) : item.type === "textarea" ? (
                      <TextAreaField item={item} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          {/* FEATURES LIST  */}
          <Separator />
          <div className="mt-5 px-10">
            <h2 className="font-bold text-xl">Features list</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              {carFeaturesData.carFeaturesData.map((item, index) => {
                return (
                  <div key={index}>
                    {item?.type === "checkbox" ? (
                      <div className="flex justify-between items-center w-[300px]">
                        <Checkbox />
                        <h2 className="text-start w-[90%] font-medium ">
                          {item?.label}
                        </h2>
                      </div>
                    ) : <h2 className="text-start w-[80%]">{item?.label}</h2> &&
                      item?.type === "dropdown" ? (
                      <DropdownField item={item} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          {/* CAR IMAGES  */}
          <div className="mt-10 mx-10 flex justify-center md:justify-end">
            <Button className='w-[200px]'>Submit</Button>
          </div>
          <div className="mt-5">
            <h2 className="font-bold text-md">Car Images</h2>
          </div>
        </form>
    </div>
  );
}

export default Add_listing;
