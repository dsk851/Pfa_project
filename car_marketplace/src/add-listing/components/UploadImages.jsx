import React from "react";
import { useState, useEffect} from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CarImages } from "../../../configs/schema";
import { db } from "../../../configs";
import { eq } from "drizzle-orm";

function UploadImages({ TriggerUploadImages, setLoader, carInfo,mode }) {
  const [EditCarImages, setEditCarImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  useEffect(() => {
    setEditCarImages([]);
    if (mode === "edit") {
      carInfo?.images.forEach((item) => {
        setEditCarImages((prev) => [...prev, item?.imageUrl]);
        // console.log("carInfo", carInfo);
        // console.log("item", item?.imageUrl);
        // console.log("EditCarImages", EditCarImages);
      }
      );
    }
  }, [carInfo]);

  const uploadImagesToServer = async () => {
    setLoader(true);
    if (selectedFiles.length === 0) {
      console.log("No file selected");
      return;
    }

    const uploadedUrls = [];

    for (let file of selectedFiles) {
      const formData = new FormData();
      const uniqueFileName = `${Date.now()}-${file.name}`;
      formData.append("public_id", uniqueFileName);
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        const uploadedUrl = data.secure_url;
        // console.log("Uploaded Image URL:", data.secure_url);
        await db.insert(CarImages).values({
          imageUrl: uploadedUrl,
          carListingId: TriggerUploadImages,
        });
        setLoader(false);
        uploadedUrls.push(data.secure_url); // Store each image URL
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    // console.log("All uploaded image URLs:", uploadedUrls);
  };

  useEffect(() => {
    if (TriggerUploadImages) {
      uploadImagesToServer();
    }
  }, [TriggerUploadImages]);

  const onFileselected = (e) => {
    const files = e.target.files;
    // console.log(files);
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFiles((prev) => [...prev, file]);
    }
  };


  const onImageRemove = (file, index) => {
    const result = selectedFiles.filter((item) => item != file);
    setSelectedFiles(result);
  };

  const onImageRemoveFromDB = async (file, index) => {
    // console.log("file", carInfo?.images[index]);
    const result = await db.delete(CarImages).where(eq(CarImages.id, carInfo?.images[index]?.id));
    if (result) {
    // console.log("Image deleted successfully");
    const updatedCarInfo = { ...carInfo };
    updatedCarInfo.images = updatedCarInfo.images.filter((_, i) => i !== index);
    setEditCarImages(updatedCarInfo);
      // console.log("result de la suppression", result) ;
    }
  }


  useEffect(() => {
    // console.log("nouvel etat images : ", selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-6"> 

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Images existantes (mode edit) */}
        {mode === "edit" &&
          EditCarImages.map((file, index) => (
            <div key={index} className="group relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={file}
                  alt="car"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <button
                onClick={() => onImageRemoveFromDB(file, index)}
                className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors duration-200"
              >
                <FaRegTrashAlt className="w-3 h-3" />
              </button>
            </div>
          ))}

        {/* Nouvelles images sélectionnées */}
        {selectedFiles.map((file, index) => (
          <div key={index} className="group relative">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={URL.createObjectURL(file)}
                alt="car"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <button
              onClick={() => onImageRemove(file, index)}
              className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors duration-200"
            >
              <FaRegTrashAlt className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Zone d'upload */}
        <label htmlFor="upload-images" className="cursor-pointer">
          <div className="aspect-square bg-blue-50 hover:bg-blue-100 border-2 border-dashed border-blue-300 hover:border-blue-400 rounded-lg flex flex-col items-center justify-center transition-all duration-200 group">
            <svg
              className="w-8 h-8 text-blue-500 mb-2 group-hover:scale-110 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-sm font-medium text-blue-600">Ajouter</span>
          </div>
        </label>

        <input
          type="file"
          multiple={true}
          id="upload-images"
          className="hidden"
          onChange={onFileselected}
        />
      </div>
    </div>
  );
}

export default UploadImages;
