import { FaCar, FaTruck, FaMotorcycle, FaBus, FaTaxi, FaShuttleVan, FaCarSide } from 'react-icons/fa';

import React from 'react'
import Data from '@/shared/data';

function Category() {
  return (
    <div className='mt-40 min-h-[300px]'>
        <h2 className='font-bold text-3xl text-center pt-10'>Browse By Cateogies</h2>
        <div className='grid grid-cols-2 sm:grid-cols-5 md:grid-cols-5 lg:grid-cols-10 gap-5 px-5 mt-10'>
            {Data.Categories.map((category) => (
                <div key={category.id} className='border-2 border-gray-200 p-5 rounded-md flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg hover:border-2 transition-all'>
                    <div className='font-[40px]'>
                        {category.icon}
                    </div>
                    <h2 className=''>{category.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Category
