import React from 'react'
import { IoIosPricetags } from "react-icons/io";

function Pricing({carDetails}) {
return (
  <div>
    <div>
      <h2 className="text-md mb-2 ml-4">Our pricing</h2>

      <h2 className="text-2xl font-bold ml-4">
        {carDetails?.selling_price} MAD
      </h2>
    </div>

    <div className="flex flex-col bg-white shadow-md p-4 rounded-lg">
      <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer">
        <IoIosPricetags /> <span>Make a pricing offer</span>
      </button>
    </div>
  </div>
);
}

export default Pricing