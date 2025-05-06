import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FaSearch } from "react-icons/fa";
import Data from '@/shared/Data';

function Search() {
  return (
    <div className='p-2 md:p-4 bg-white rounded-md md:rounded-full flex flex-col md:flex md:flex-row gap-4 md:gap-3 px-5 items-center w-full md:w-auto shadow-lg'>
      <Select>
        <SelectTrigger className="w-full md:w-[200px] border border-gray-300 rounded-md">
          <SelectValue placeholder="Cars" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">New</SelectItem>
          <SelectItem value="dark">Old</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block h-6 border-gray-300"/>
      <Select>
        <SelectTrigger className="w-full md:w-[200px] border border-gray-300 rounded-md">
          <SelectValue placeholder="Car Brands" />
        </SelectTrigger>
        <SelectContent>
          {Data.carMakes.map((make) => (
            <SelectItem key={make.id} value={make.name}>{make.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block h-6 border-gray-300"/>
      <Select>
        <SelectTrigger className="w-full md:w-[200px] border border-gray-300 rounded-md">
          <SelectValue placeholder="Pricing" />
        </SelectTrigger>
        <SelectContent>
          {Data.Pricing.map((price) => (
            <SelectItem key={price.id} value={price.amount}>{price.amount}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="hidden md:block h-6 border-gray-300"/>
      <FaSearch className="text-[40px] rounded-full bg-primary flex items-center justify-center text-white p-3 cursor-pointer hover:bg-blue-600 active:bg-blue-700 active:scale-110 transition-all" />
    </div>
  )
}

export default Search