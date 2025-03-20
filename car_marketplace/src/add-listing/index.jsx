import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import carDetailsData from "./../shared/carDetailsData";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import UploadImages from "./components/UploadImages";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";
import carFeaturesData from "./../shared/CarFeaturesData";
import { CarListing } from "../../configs/schema";
import { db } from "../../configs";
import IconField from "./components/IconField";

function Add_listing() {

  const [formData, setFormaData] = useState([])
  const [FeaturesData, setFeaturesData] = useState([])
  const [finalData, setFinalData] = useState({});

/**
  * @param {*} name
  * @param {*} value
  * used to handle the input change
*/
  const handleInputChange = (name, value)=>{
    setFormaData((prevData)=>({
      ...prevData,
      [name]: value
    }))
  }


/**
 * @param {*} name
 * @param {*} value
 * used to handle the features change
 */
  const handleFeaturesChange = (name, value)=>{
    setFeaturesData((prevData)=>({
      ...prevData,
      [name]: value
    }))

    console.log({...formData, FeaturesData})
  }

  const saveData =async ()=>{
    try
    {
      const result =await db.insert(CarListing).values(finalData);
      if (result) {
        console.log("Data inserted successfully");
      }
    }
    catch(err)
    {
      console.log("savedata error", err)
    }
  }

  const onsubmit = (e)=>{
    e.preventDefault();
    console.log("Form data (submited): ", finalData)
    try
    {
      saveData()
    }
    catch(err)
    {
      console.log("error (savedata onsubmit) : ", err)
    }
  } 


  useEffect(() => {
    console.log("Nouvel état : ", formData);
    console.log("Nouvel état : ", FeaturesData);
    setFinalData({...formData, features: FeaturesData})
  }, [formData, FeaturesData]);

  useEffect(() => {
    console.log("Nouvel état : ", finalData);
  }, [finalData]);
  
  return (
    <div className="p-5">
      <Header/>
        <h2 className="font-bold text-xl md:text-3xl mt-5 mx-5">Add New Listing</h2>
        <form
          action=""
          className="my-5 mx-5 border-2 border-gray-200 p-5 rounded-2xl">
          {/* CARS DETAILS */}
          <div className="my-5 px-5">
            <h2 className="font-bold text-xl">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 transition-all">
              {carDetailsData.carDetailsData.map((item, index) => {
                return (
                  <div key={index} className="m-1">
                    <label className="text-sm font-bold flex align-center gap-3 mb-2">
                      <IconField icon={item?.icon} />
                      {item?.label}
                      {item.required && (
                        <span className="text-red-700 font-bold">*</span>
                      )}
                    </label>
                    {item.type === "text" || item.type === "number" ? (
                      <InputField item={item} handleInputChange={handleInputChange}/>
                    ) : item.type === "select" ? (
                      <DropdownField item={item} handleInputChange={handleInputChange} />
                    ) : item.type === "textarea" ? (
                      <TextAreaField item={item} handleInputChange={handleInputChange} />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
          {/* FEATURES LIST  */}
          <Separator className="my-5" />
          <div className="mt-5 px-5">
            <h2 className="font-bold text-xl">Features list</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
              {carFeaturesData.carFeaturesData.map((item, index) => {
                return (
                  <div key={index}>
                    {item?.type === "checkbox" ? (
                      <div className="flex justify-between items-center w-[300px]">
                        <Checkbox onCheckedChange={(value)=>handleFeaturesChange(item.name, value)}/>
                        <h2 className="text-start w-[90%] font-medium ">
                          {item?.label}
                        </h2>
                      </div>
                    ) 
                    // : <h2 className="text-start w-[80%]">{item?.label}</h2> &&
                    //   item?.type === "dropdown" ? (
                    //   <DropdownField item={item} handleInputChange={handleInputChange} />
                    // ) 
                    : null}
                  </div>
                );
              })}
            </div>
          </div>
          {/* CAR IMAGES  */}
          <Separator className="my-5"/> 
          <UploadImages/>
          <div className="flex justify-center md:justify-end">
            <Button className='w-[200px]' onClick={(e)=>onsubmit(e)}>Submit</Button>
          </div>
        </form>
    </div>
  );
}

export default Add_listing;
