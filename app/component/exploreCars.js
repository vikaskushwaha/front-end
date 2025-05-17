import React, { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { RiGasStationLine } from 'react-icons/ri';
import { TbManualGearbox } from 'react-icons/tb';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

const ExploreCars = () => {
    // Tab state management
    const [activeTab, setActiveTab] = useState('in-stock');

    // Car data
    const cars = [
        {
            id: 1,
            name: "Ford Transit - 2021",
            specs: "4.0 D5 PowerPulse Momentum 5dr AWD",
            image: "/cars/ford-transit.jpg",
            tag: "Great Price",
            tagColor: "bg-green-500",
            miles: "2500 Miles",
            fuelType: "Diesel",
            transmission: "Manual",
            price: "$22,000"
        },
        {
            id: 2,
            name: "New GLC - 2023",
            specs: "4.0 D5 PowerPulse Momentum 5dr AWD",
            image: "/cars/nissan-blue.jpg",
            tag: "Low Mileage",
            tagColor: "bg-blue-500",
            miles: "50 Miles",
            fuelType: "Petrol",
            transmission: "Automatic",
            price: "$95,000"
        },
        {
            id: 3,
            name: "Audi A6 3.5 - New",
            specs: "3.5 D5 PowerPulse Momentum 5dr AWD",
            image: "/cars/audi-a6.jpg",
            tag: null,
            miles: "100 Miles",
            fuelType: "Petrol",
            transmission: "Automatic",
            price: "$58,000"
        },
        {
            id: 4,
            name: "Corolla Altis - 2023",
            specs: "3.5 D5 PowerPulse Momentum 5dr AWD",
            image: "/cars/mini-cooper.jpg",
            tag: null,
            miles: "15000 Miles",
            fuelType: "Petrol",
            transmission: "CVT",
            price: "$45,000"
        },
        {
            id: 5,
            name: "Ford Explorer 2023",
            specs: "3.5 D5 PowerPulse Momentum",
            image: "/cars/ford-explorer.jpg",
            tag: "Great Price",
            tagColor: "bg-green-500",
            miles: "10 Miles",
            fuelType: "Diesel",
            transmission: "Automatic",
            price: "$35,000"
        }
    ];

    return (
        <div id="explore-cars" className="w-full pt-8 mt-6  px-9 lg:px-12 py-8 bg-white ">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore All Vehicles</h2>
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    View All <HiArrowRight className="ml-2" />
                </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`mr-8 pb-2 text-sm font-medium ${activeTab === 'in-stock' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('in-stock')}
                >
                    In Stock
                </button>
                <button
                    className={`mr-8 pb-2 text-sm font-medium ${activeTab === 'new-cars' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('new-cars')}
                >
                    New Cars
                </button>
                <button
                    className={`mr-8 pb-2 text-sm font-medium ${activeTab === 'used-cars' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
                    onClick={() => setActiveTab('used-cars')}
                >
                    Used Cars
                </button>
            </div>

            {/* Car Listings */}
            <div className="relative gap-y-2 flex flex-col">
                <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
                    {cars.map((car) => (
                        <div key={car.id} className="min-w-[280px] max-w-[280px] border border-gray-100 rounded-lg overflow-hidden shadow-sm flex-shrink-0">
                            {/* Car Image with Tag */}
                            <div className="relative h-[160px]">
                                <div
                                    className="w-full h-full bg-cover bg-center"
                                    style={{ backgroundImage: `url(${car.image})` }}
                                />
                                {car.tag && (
                                    <span className={`absolute top-3 left-3 ${car.tagColor} text-white text-xs px-2 py-1 rounded-md`}>
                                        {car.tag}
                                    </span>
                                )}
                                <button className="absolute top-3 right-3 bg-white p-1.5 rounded-md shadow-sm">
                                    <BsBookmark className="text-gray-600" />
                                </button>
                            </div>

                            {/* Car Details */}
                            <div className="p-4">
                                <h3 className="font-medium text-lg">{car.name}</h3>
                                <p className="text-xs text-gray-500 truncate">{car.specs}</p>

                                {/* Icons row */}
                                <div className="flex justify-between mt-3 mb-4">
                                    <div className="flex flex-col items-center">
                                        <IoSpeedometerOutline className="text-gray-600 mb-1" />
                                        <span className="text-xs text-gray-500">{car.miles}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <RiGasStationLine className="text-gray-600 mb-1" />
                                        <span className="text-xs text-gray-500">{car.fuelType}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <TbManualGearbox className="text-gray-600 mb-1" />
                                        <span className="text-xs text-gray-500">{car.transmission}</span>
                                    </div>
                                </div>

                                {/* Price and View Details */}
                                <div className="flex justify-between items-center mt-2">
                                    <span className="font-bold text-lg">{car.price}</span>
                                    <a href="#" className="text-blue-500 text-sm flex items-center">
                                        View Details
                                        <HiArrowRight className="ml-1 text-xs" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Arrows - with added vertical spacing */}
                <div className="absolute bottom-[-40px] left-0 flex">
                    <button className="bg-white w-8 h-8 rounded-l-full shadow-md flex items-center justify-center border border-gray-100">
                        <BsArrowLeft className="text-gray-700" />
                    </button>
                    <button className="bg-white w-8 h-8 rounded-r-full shadow-md flex items-center justify-center border border-gray-100 border-l-0">
                        <BsArrowRight className="text-gray-700" />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ExploreCars;

