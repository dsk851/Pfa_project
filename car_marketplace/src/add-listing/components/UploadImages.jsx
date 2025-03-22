
import React from "react";
import { useState, useEffect } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import {Button} from "@/components/ui/button";


function UploadImages() {

  const [selectedFiles, setSelectedFiles] = useState([]);
  const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const url = 'https://api.cloudinary.com/v1_1/'+CLOUD_NAME+'/image/upload';
  const onFileselected = (e) => {
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files?.length; i++) {
      const file = files[i];
      setSelectedFiles((prev) => [...prev, file]);
    }
  };

  const UploadImages=()=>{
    if(selectedFiles.length===0){
      console.log('No file selected');
      return;
    }else{
    const formData = new FormData();
    selectedFiles.map((file)=>formData.append('file',file));
    formData.append('upload_preset',UPLOAD_PRESET);
    console.log(CLOUD_NAME, UPLOAD_PRESET);

    fetch(url,{
      method:'POST',
      body:formData
    }).then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((error)=>console.error(error, 'erreur lors de l\'upload'));}
  }
  
  const onImageRemove = (file,index) =>{
    const result = selectedFiles.filter((item)=>item!=file);
    setSelectedFiles(result)
  }
  useEffect(() => {
    console.log('nouvel etat images : ', selectedFiles);
  }
  , [selectedFiles]);

  return (
    <div className="px-5">
      <h2 className="font-bold text-xl my-5">Upload Car Images</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5">
        {selectedFiles.map((file, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
              <img
                src={URL.createObjectURL(file)}
                alt="car"
                className="w-full h-[150px] object-cover rounded-xl"
              />
              <h2 className="p-2 mt-1 rounded-xl flex justify-center w-full  bg-red-100 text-red-600 text-xl hover:bg-red-500 hover:text-white cursor-pointer transition-colors duration-300" onClick={()=>onImageRemove(file,index)}><FaRegTrashAlt/></h2>
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
      <Button className='mt-5' onClick={UploadImages}> Upload image </Button>
    </div>
  );
}

export default UploadImages;
