import React from 'react'
import { Separator } from "@/components/ui/separator"
import { LuFuel } from "react-icons/lu";
import { SiSpeedtest } from "react-icons/si";
import { GoGear } from "react-icons/go";

function CarItem({car}) {
return (
    <div className='w-[300px] sm:w-[200] hover:shadow-xl hover:border-2 transition-all border-2 border-gray-200 rounded-md '>
        <img src={car?.image} width={300} height={250} alt='car_image' className='rounded-t-md  transition-all'/>
        <div className='m-2'>
            <h2 className='text-md text-start font-bold text-gray-600 mb-2'>{car?.name}</h2>
            </div>
            <Separator/>
            <div className='grid grid-cols-3 mt-2 mb-2'>
                <div className='flex flex-col items-center gap-1'>
                    <LuFuel className='text-[12px] text-gray-500' />
                    <h2 className='text-gray-800 text-[12px]'>{car?.fuelType}</h2>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <SiSpeedtest  className='text-[12px] text-gray-500' />
                    <h2 className='text-gray-800 text-[12px]'>{car?.miles}</h2>
                </div>
                <div className='flex flex-col items-center gap-1'>
                    <GoGear className='text-[12px] text-gray-500 ' />
                    <h2 className='text-gray-800 text-[12px]'>{car?.gearType}</h2>
            </div>
        </div>
        <Separator/>
            <div className='flex justify-between items-center m-2'>
                <h2 className='text-md text-start font-bold text-gray-600 mb-2'>${car?.price}</h2>
                <h2 className='text-[12px] text-start font-bold text-blue-400 mb-2'>View details</h2>
            </div>
    </div>
)
}

export default CarItem