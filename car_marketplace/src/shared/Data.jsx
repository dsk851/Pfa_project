import { FaCar, FaTruck, FaMotorcycle, FaBus, FaTaxi, FaShuttleVan, FaCarSide } from 'react-icons/fa';

const carMakes=[
    {id:1, name:'Toyota'},
    {id:2, name:'Honda'},
    {id:3, name:'BMW'},
    {id:4, name:'Mercedes'},
    {id:5, name:'Ford'},
    {id:6, name:'Nissan'},
]

const Pricing=[
    {id:1, amount:'$1000'},
    {id:2, amount:'$2000'},
    {id:3, amount:'$3000'},
    {id:4, amount:'$4000'},
    {id:5, amount:'$5000'},
    {id:6, amount:'$6000'},
    {id:7, amount:'$7000'},
    {id:8, amount:'$8000'},
    {id:9, amount:'$9000'},
    {id:10, amount:'$10000'},
]

const Categories = [
    {id: 1, name: 'Sedan', icon: <FaCar className='text-[30px]'/>},
    {id: 2, name: 'SUV', icon: <FaCarSide className='text-[30px]' />},
    {id: 3, name: 'Truck', icon: <FaTruck className='text-[30px]'/>},
    {id: 4, name: 'Coupe', icon: <FaCar className='text-[30px]'/>},
    {id: 5, name: 'Convertible', icon: <FaTaxi className='text-[30px]'/>},
    {id: 6, name: 'Van', icon: <FaShuttleVan className='text-[30px]'/>},
    {id: 7, name: 'Wagon', icon: <FaBus className='text-[30px]' />},
    {id: 8, name: 'Hatchback', icon: <FaCar className='text-[30px]'/>},
    {id: 9, name: 'Crossover', icon: <FaCarSide className='text-[30px]'/>},
    {id: 10, name: 'Sports Car', icon: <FaMotorcycle className='text-[30px]'/>},
]

export default {carMakes, Pricing, Categories}