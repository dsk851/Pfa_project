import React from "react";
import { useState, useEffect, useCallback } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { CarImages } from "../../../configs/schema";
import { db } from "../../../configs";

function UploadImages({ TriggerUploadImages, setLoader }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const uploadImagesToServer = useCallback(async () => {
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
        console.log("Uploaded Image URL:", data.secure_url);

        await db.insert(CarImages).values({
          imageUrl: uploadedUrl,
          carListingId: TriggerUploadImages,
        });
        uploadedUrls.push(data.secure_url); // Store each image URL
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
    console.log("All uploaded image URLs:", uploadedUrls);
  }, [selectedFiles, UPLOAD_PRESET, url, TriggerUploadImages,setLoader]);


  useEffect(() => {
    if (TriggerUploadImages) {
      uploadImagesToServer();
    }
  }, [TriggerUploadImages, uploadImagesToServer]);
  const onFileselected = (e) => {
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFiles((prev) => [...prev, file]);
    }
  };
  const onImageRemove = (file, index) => {
    const result = selectedFiles.filter((item) => item != file);
    setSelectedFiles(result);
  };
  useEffect(() => {
    console.log("nouvel etat images : ", selectedFiles);
  }, [selectedFiles]);

  return (
    <div className="px-5">
      <h2 className="font-bold text-xl my-5">Upload Car Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFiles.map((file, index) => (
          <div
            key={index}
            className="flex flex-col justify-center items-center"
          >
            <img
              src={URL.createObjectURL(file)}
              alt="car"
              className="w-full h-[150px] object-cover rounded-xl"
            />
            <h2
              className="p-2 mt-1 rounded-xl flex justify-center w-full  bg-red-100 text-red-600 text-xl hover:bg-red-500 hover:text-white cursor-pointer transition-colors duration-300"
              onClick={() => onImageRemove(file, index)}
            >
              <FaRegTrashAlt />
            </h2>
          </div>
        ))}
        <label htmlFor="upload-images">
          <div className="flex justify-center items-center cursor-pointer hover:shadow-md transition-shadow duration-400 rounded-xl bg-blue-100 h-[150px]">
            <h2 className="text-lg font-bold text-center text-primary ">+</h2>
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
