import React, { useState } from 'react';
import { HiOutlineBookmark, HiArrowRight, HiArrowLeft } from 'react-icons/hi';
import { FaGasPump } from 'react-icons/fa';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { TbManualGearbox } from 'react-icons/tb';

const PopularMakes = () => {
    const [activeBrand, setActiveBrand] = useState('Audi');

    const carData = [
        {
            id: 1,
            brand: 'Audi',
            model: 'A5',
            year: '2023',
            specs: '2.0 D5 PowerPulse Momentum 5dr AWD',
            image: '/cars/audi-a5.jpg',
            onSale: true,
            miles: '500 Miles',
            fuelType: 'Petrol',
            transmission: 'Automatic',
            originalPrice: '$50,000',
            salePrice: '$45,000'
        },
        {
            id: 2,
            brand: 'Audi',
            model: 'A4',
            year: '2022',
            specs: '2.0 D5 PowerPulse Momentum 5dr AWD',
            image: '/cars/range-rover.jpg',
            onSale: true,
            miles: '150 Miles',
            fuelType: 'Diesel',
            transmission: 'CVT',
            salePrice: '$120,000'
        },
        {
            id: 3,
            brand: 'Audi',
            model: 'Q7',
            year: '2023',
            specs: '3.0 TDI Quattro S Line',
            image: '/cars/audi-q7.jpg',
            onSale: false,
            miles: '10 Miles',
            fuelType: 'Diesel',
            transmission: 'Automatic',
            salePrice: '$85,000'
        },
        {
            id: 4,
            brand: 'Ford',
            model: 'Explorer',
            year: '2023',
            specs: '3.0 EcoBoost ST-Line',
            image: '/cars/ford-explorer.jpg',
            onSale: true,
            miles: '300 Miles',
            fuelType: 'Petrol',
            transmission: 'Automatic',
            originalPrice: '$45,000',
            salePrice: '$40,000'
        },
        {
            id: 5,
            brand: 'Mercedes Benz',
            model: 'GLC',
            year: '2023',
            specs: '2.0 4MATIC AMG Line',
            image: '/cars/mercedes-glc.jpg',
            onSale: false,
            miles: '50 Miles',
            fuelType: 'Hybrid',
            transmission: 'Automatic',
            salePrice: '$65,000'
        }
    ];

    const filteredCars = carData.filter(car => car.brand === activeBrand);

    const brands = ['Audi', 'Ford', 'Mercedes Benz'];

    return (
        <div className="w-full bg-[#050c1f] text-white py-16 mt-16">
            <div className="container mx-auto px-4 md:px-8">
                {/* Header with title and view all */}
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold">Popular Makes</h2>
                    <a href="#" className="flex items-center text-white hover:text-blue-300">
                        View All <HiArrowRight className="ml-2" />
                    </a>
                </div>

                {/* Brand tabs */}
                <div className="flex space-x-8 mb-10">
                    {brands.map(brand => (
                        <button
                            key={brand}
                            className={`pb-2 ${activeBrand === brand ? 'text-white border-b-2 border-white font-medium' : 'text-gray-400'}`}
                            onClick={() => setActiveBrand(brand)}
                        >
                            {brand}
                        </button>
                    ))}
                </div>

                {/* Car cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {filteredCars.map(car => (
                        <div key={car.id} className="bg-[#0a1530] rounded-lg overflow-hidden">
                            {/* Car image */}
                            <div className="relative h-48">
                                <img
                                    src={car.image}
                                    // alt={`${car.brand} ${car.model}`}
                                    className="w-full h-full object-cover"
                                />
                                {car.onSale && (
                                    <span className="absolute top-4 left-4 bg-blue-600 text-white text-xs px-3 py-1 rounded-md">
                                        Sale
                                    </span>
                                )}
                                <button className="absolute top-4 right-4 p-2 bg-white rounded-full">
                                    <HiOutlineBookmark className="text-gray-700" />
                                </button>
                            </div>

                            {/* Car details */}
                            <div className="p-5">
                                <h3 className="text-xl font-semibold mb-1">
                                    {car.brand} {car.model} - {car.year}
                                </h3>
                                <p className="text-sm text-gray-400 mb-4">{car.specs}</p>

                                {/* Car specs */}
                                <div className="grid grid-cols-3 gap-2 mb-4">
                                    <div className="flex items-center">
                                        <IoSpeedometerOutline className="text-gray-400 mr-2" />
                                        <span className="text-sm">{car.miles}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaGasPump className="text-gray-400 mr-2" />
                                        <span className="text-sm">{car.fuelType}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <TbManualGearbox className="text-gray-400 mr-2" />
                                        <span className="text-sm">{car.transmission}</span>
                                    </div>
                                </div>

                                {/* Price and link */}
                                <div className="flex justify-between items-center">
                                    <div>
                                        {car.originalPrice && (
                                            <span className="text-gray-400 line-through text-sm mr-2">
                                                {car.originalPrice}
                                            </span>
                                        )}
                                        <span className="text-xl font-bold">{car.salePrice}</span>
                                    </div>
                                    <a href="#" className="flex items-center text-blue-400 hover:text-blue-300">
                                        View Details <HiArrowRight className="ml-2" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation controls */}
                <div className="flex space-x-4 justify-start">
                    <button className="p-3 border border-gray-600 rounded-full hover:bg-gray-800">
                        <HiArrowLeft />
                    </button>
                    <button className="p-3 border border-gray-600 rounded-full hover:bg-gray-800">
                        <HiArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PopularMakes;