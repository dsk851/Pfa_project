import React from 'react'
import { FaCar, FaQuoteRight, FaDollarSign, FaTag, FaLayerGroup, FaCheckCircle, FaIndustry, FaCarSide, FaCalendarAlt, FaCarBattery, FaBarcode, FaRoad, FaGasPump, FaCogs, FaTachometerAlt, FaWrench, FaCog, FaPalette, FaDoorOpen, FaHandshake, FaInfoCircle } from 'react-icons/fa';

const IconMap = {
    FaCar : <FaCar />,
    FaQuoteRight : <FaQuoteRight />,
    FaDollarSign : <FaDollarSign />,
    FaTag : <FaTag />,
    FaLayerGroup : <FaLayerGroup />,
    FaCheckCircle : <FaCheckCircle />,
    FaIndustry : <FaIndustry />,
    FaCarSide : <FaCarSide />,
    FaCalendarAlt : <FaCalendarAlt />,
    FaCarBattery : <FaCarBattery />,
    FaBarcode : <FaBarcode />,
    FaRoad : <FaRoad />,
    FaGasPump : <FaGasPump />,
    FaCogs : <FaCogs />,
    FaTachometerAlt : <FaTachometerAlt />,
    FaWrench : <FaWrench />,
    FaCog : <FaCog />,
    FaPalette : <FaPalette />,
    FaDoorOpen : <FaDoorOpen />,
    FaHandshake : <FaHandshake />,
    FaInfoCircle : <FaInfoCircle /> 
}

function IconField({icon}) {
  return (
    <div className='text-blue-600 bg-blue-200 p-1.5 rounded-full'>{IconMap[icon]}</div>
  )
}

export default IconField