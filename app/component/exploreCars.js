import React, { useRef, useState, useEffect } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { BsBookmark, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { RiGasStationLine } from 'react-icons/ri';
import { TbManualGearbox } from 'react-icons/tb';
import { Card, CardContent } from "@/components/ui/card";
import { useSearch } from '../context/SearchContext';

const ExploreCars = () => {
    const scrollRef = useRef(null);
    const [activeTab, setActiveTab] = useState('in-stock');
    const { searchResults } = useSearch();

    // Format all vehicles from search results
    const formatVehicles = (results) => {
        if (!results?.vehclesList) return [];

        return results.vehclesList.map(vehicle => ({
            id: vehicle._id,
            name: `${vehicle.make} ${vehicle.model} ${vehicle.year}`,
            specs: `${vehicle.engine} ${vehicle.drivetrain}`,
            image: vehicle.mainImage || '/background2.jpg?v=1',
            tag: vehicle.greatPrice ? "Great Price" :
                vehicle.specialOffer ? "Special Offer" :
                    vehicle.lowMileage ? "Low Mileage" : null,
            tagColor: vehicle.greatPrice ? "bg-green-500" :
                vehicle.specialOffer ? "bg-blue-500" :
                    vehicle.lowMileage ? "bg-purple-500" : null,
            miles: `${vehicle.mileage.toLocaleString()} Miles`,
            fuelType: vehicle.fuelType,
            transmission: vehicle.transmission,
            price: `$${vehicle.price.toLocaleString()}`,
            condition: vehicle.condition,
            inStock: vehicle.inStock
        }));
    };

    const allVehicles = formatVehicles(searchResults);

    const scroll = (direction) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -300 : 300,
                behavior: 'smooth',
            });
        }
    };

    // Get vehicles to display based on active tab
    const getDisplayCars = () => {
        // Only use API data
        switch (activeTab) {
            case 'in-stock':
                return allVehicles.filter(car => car.inStock === true);
            case 'new-cars':
                return allVehicles.filter(car => car.condition === 'New');
            case 'used-cars':
                return allVehicles.filter(car => car.condition === 'Used');
            default:
                return allVehicles.filter(car => car.inStock === true);
        }
    };

    const displayCars = getDisplayCars();

    // Tab titles with counts
    const getTabTitle = (tab) => {
        switch (tab) {
            case 'in-stock':
                const inStockCount = allVehicles.filter(car => car.inStock === true).length;
                return `In Stock (${inStockCount})`;
            case 'new-cars':
                const newCarsCount = allVehicles.filter(car => car.condition === 'New').length;
                return `New Cars (${newCarsCount})`;
            case 'used-cars':
                const usedCarsCount = allVehicles.filter(car => car.condition === 'Used').length;
                return `Used Cars (${usedCarsCount})`;
            default:
                return tab.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        }
    };

    return (
        <div id="explore-cars" className="w-full pt-8 mt-6 px-4 lg:px-12 py-8 bg-white relative">

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore All Vehicles</h2>
                <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    View All <HiArrowRight className="ml-2" />
                </button>
            </div>


            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto hide-scrollbar">
                {["in-stock", "new-cars", "used-cars"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`mr-6 pb-2 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'
                            }`}
                    >
                        {getTabTitle(tab)}
                    </button>
                ))}
            </div>
            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-4 scroll-smooth snap-x snap-mandatory hide-scrollbar pb-6"
                >
                    {displayCars.length > 0 ? (
                        displayCars.map((car) => (
                            <Card
                                key={car.id}
                                className="min-w-[280px] snap-start shadow-sm border-gray-100 flex-shrink-0"
                            >
                                <div className="relative h-[160px] w-full">
                                    <img
                                        src={car.image}
                                        alt={car.name}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        onError={(e) => {
                                            // Replace with a local fallback image when the URL fails
                                            e.target.src = '/background2.jpg';
                                            // Or use an external placeholder if local image also fails
                                            e.target.onerror = () => {
                                                e.target.src = 'https://placehold.co/600x400/e5e7eb/a1a1aa?text=Vehicle';
                                                e.target.onerror = null; // Prevent infinite loop
                                            };
                                        }}
                                    />

                                    {car.tag && (
                                        <span className={`absolute top-3 left-3 z-10 ${car.tagColor} text-white text-xs px-2 py-1 rounded-md`}>
                                            {car.tag}
                                        </span>
                                    )}
                                    <button className="absolute top-3 right-3 z-10 bg-white p-1.5 rounded-md shadow-sm">
                                        <BsBookmark className="text-gray-600" />
                                    </button>
                                </div>

                                <CardContent className="p-4">
                                    <h3 className="font-medium text-lg">{car.name}</h3>
                                    <p className="text-xs text-gray-500 truncate">{car.specs}</p>

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

                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-lg">{car.price}</span>
                                        <a href="#" className="text-blue-500 text-sm flex items-center">
                                            View Details <HiArrowRight className="ml-1 text-xs" />
                                        </a>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    ) : (
                        <div className="w-full py-12 text-center">
                            <p className="text-gray-500 text-lg">No vehicles available in this category.</p>
                        </div>
                    )}
                </div>

                {/* Arrow Buttons */}
                {displayCars.length > 3 && (
                    <>
                        <div className="absolute top-[50%] -translate-y-1/2 left-2 z-10">
                            <button
                                onClick={() => scroll('left')}
                                className="bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center border"
                            >
                                <BsArrowLeft />
                            </button>
                        </div>
                        <div className="absolute top-[50%] -translate-y-1/2 right-2 z-10">
                            <button
                                onClick={() => scroll('right')}
                                className="bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center border"
                            >
                                <BsArrowRight />
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ExploreCars;
