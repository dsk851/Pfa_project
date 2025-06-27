import Header from "@/components/Header";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import carDetailsData from "./../shared/carDetailsData.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import UploadImages from "./components/UploadImages";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState, useEffect } from "react";
import carFeaturesData from "../shared/CarFeaturesData.json";
import { CarListing, CarImages } from "../../configs/schema";
import { db } from "../../configs";
import IconField from "./components/IconField";
import { dotPulse } from "ldrs";
dotPulse.register();
import { Toaster } from "../../src/components/ui/sonner";
import { useUser } from "@clerk/clerk-react";
import moment from "moment";
import { useNavigate, useSearchParams } from "react-router";
import {eq} from "drizzle-orm";
import {FormatResult} from "@/shared/Service";
import { toast } from "sonner";
import Footer from "@/components/Footer";



function Add_listing() {
  const [formData, setFormaData] = useState([]);
  const [FeaturesData, setFeaturesData] = useState([]);
  const [finalData, setFinalData] = useState({});
  const [TriggerUploadImages, setTriggerUploadImages] = useState();
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const [searchParams] = useSearchParams()
  const [carInfo, setCarInfo] = useState();
  const navigate= useNavigate();
  
  const mode = searchParams.get("mode");
  const id = searchParams.get("id");

  useEffect(() => {
    if (mode === "edit") {
      GetListingDetails();
    }
  }, []);

  const GetListingDetails = async () => {
    const result = await db.select().from(CarListing)
    .innerJoin(CarImages, eq(CarListing.id, CarImages.carListingId))
    .where(eq(CarListing.id, id))

    
    // console.log(result);
    const resp = FormatResult(result);
    setCarInfo(resp[0]);
  
    setFeaturesData(resp[0]?.features);
    // setFinalData({
    //   ...FormData,FeaturesData,});

    console.log(finalData);
    console.log("response",resp);
  }
  /**
   * @param {*} name
   * @param {*} value
   * used to handle the input change
   */
  const handleInputChange = (name, value) => {
    setFormaData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  /**
   * @param {*} name
   * @param {*} value
   * used to handle the features change
   */
  const handleFeaturesChange = (name, value) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    console.log({ ...formData, FeaturesData });
  };

  const saveData = async () => {
    try {
      setLoader(true);
      const result = await db
        .insert(CarListing)
        .values({
          ...finalData,
          createdBy: user?.primaryEmailAddress.emailAddress,
          username: user?.fullName || user?.emailAddresses[0]?.emailAddress,
          userImageUrl: user?.imageUrl,
          createdAt: moment().format("YYYY-MM-DD HH:mm:ss"),
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
        })
        .returning({ id: CarListing.id });
      if (result) {
        console.log("Data inserted successfully");
        toast.success("Data inserted successfully");
        setTriggerUploadImages(result[0]?.id);
      }
    } catch (err) {
      console.log("savedata error", err);
    } finally {
      setLoader(false);
    }
  };

  const onsubmit = async (e) => {
    e.preventDefault();
    console.log("Form data (submited): ", finalData);
    if(mode === 'edit')
    {
      const result = await db.update(CarListing).set({
        ...finalData,
          createdBy: user?.primaryEmailAddress.emailAddress,
          username: user?.fullName || user?.emailAddresses[0]?.emailAddress,
          userImageUrl: user?.imageUrl,
          updatedAt: moment().format("YYYY-MM-DD HH:mm:ss"),
      }).where(eq(CarListing.id, id)).returning({ id: CarListing.id });
      console.log(result);
      if (result) {
        console.log("Data updated successfully");
        setTriggerUploadImages(result[0]?.id);
      }
      setLoader(false);
      navigate("/profil");
    }
    else{
    try {
      saveData();
    } catch (err) {
      console.log("error (savedata onsubmit) : ", err);
    }  
    }
    
  };

  useEffect(() => {
    // console.log("Nouvel état : ", formData);
    // console.log("Nouvel état : ", FeaturesData);
    setFinalData({ ...formData, features: FeaturesData });
  }, [formData, FeaturesData]);

  // useEffect(() => {
  //   // console.log("Nouvel état : ", finalData);
  // }, [finalData]);

  return (
    <div className="mt-15">
      <Header />
      <div className="flex justify-between items-center px-10 py-3 ">
        <h2 className="font-bold text-xl md:text-3xl mt-5 mx-5">
          {mode == "edit" ? "Edit Listing" : "Add New Listing"}
        </h2>
      </div>

      <form action="" className="mb-5 mx-5 p-5 rounded-2xl">
        {/* CARS DETAILS */}
        <div className="my-5 px-5">
          <h2 className="font-bold text-xl">Car Details</h2>
          {(mode !== "edit" || carInfo) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 transition-all">
              {carDetailsData?.carDetailsData.map((item, index) => {
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
                      <InputField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : item.type === "select" ? (
                      <DropdownField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : item.type === "textarea" ? (
                      <TextAreaField
                        item={item}
                        handleInputChange={handleInputChange}
                        carInfo={carInfo}
                      />
                    ) : null}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {/* FEATURES LIST  */}
        <Separator className="my-5" />
        <div className="mt-5 px-5">
          <h2 className="font-bold text-xl">Features list</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
            {carFeaturesData?.carFeaturesData.map((item, index) => {
              // console.log("item", item);
              return (
                <div key={index}>
                  {item?.type === "checkbox" ? (
                    <div className="flex justify-between items-center w-[300px]">
                      <Checkbox
                        onCheckedChange={(value) =>
                          handleFeaturesChange(item.name, value)
                        }
                        checked={FeaturesData?.[item?.name]}
                      />
                      <h2 className="text-start w-[90%] font-medium ">
                        {item?.label}
                      </h2>
                    </div>
                  ) : // : <h2 className="text-start w-[80%]">{item?.label}</h2> &&
                  //   item?.type === "dropdown" ? (
                  //   <DropdownField item={item} handleInputChange={handleInputChange} />
                  // )
                  null}
                </div>
              );
            })}
          </div>
        </div>
        {/* CAR IMAGES  */}
        <Separator className="my-5" />
        <UploadImages
          TriggerUploadImages={TriggerUploadImages}
          setLoader={(v) => {
            setLoader(v);
            navigate("/profil");
          }}
          carInfo={carInfo}
          mode={mode}
        />
        <div className="flex justify-center md:justify-end mt-5">
          <div className="flex gap-5 items-center flex-col">
            <Button
              className="w-[200px]"
              onClick={(e) => onsubmit(e)}
              disabled={loader}
            >
              {!loader ? (
                "Submit"
              ) : (
                <l-dot-pulse size="43" speed="1.3" color="white"></l-dot-pulse>
              )}
            </Button>

            <Button
              className="w-[200px] bg-accent text-black hover:bg-gray-400 transition-all duration-500 hover:text-white border-1 border-gray-300 hover:border-none outline-0"
              onClick={() => {
                navigate("/profil");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default Add_listing;
