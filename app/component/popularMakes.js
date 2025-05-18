'use client';

import React, { useState, useEffect, useRef } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { BsBookmark, BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { TbManualGearbox } from 'react-icons/tb';
import { RiGasStationLine } from 'react-icons/ri';
// Import the server action
import { fetchVehiclesByBrand } from '../action/fetchpopular';

const Card = ({ children, className }) => {
    return (
        <div className={`bg-white rounded-lg overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

const CardContent = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

const PopularMakes = () => {
    const [activeBrand, setActiveBrand] = useState('Audi');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const scrollContainerRef = useRef(null);

    const brands = ['Audi', 'Ford', 'BMW'];

    // Fetch data whenever the active brand changes, now using the server action
    useEffect(() => {
        const loadVehicles = async () => {
            setLoading(true);

            // Call the server action
            const result = await fetchVehiclesByBrand(activeBrand);

            if (result.success) {
                setCars(result.data);
            } else {
                setCars([]);
                setError(result.error || 'Failed to load vehicles');
            }

            setLoading(false);
        };

        loadVehicles();
    }, [activeBrand]);

    // Scroll container left or right
    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = container.clientWidth / 2;

            if (direction === 'left') {
                container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    // Format car data for display
    const displayCars = cars.map(car => ({
        id: car._id,
        name: `${car.make} ${car.model} ${car.year}`,
        specs: car.description ? car.description.substring(0, 60) + '...' : '',
        image: car.mainImage || (car.images && car.images[0]),
        price: `$${car.price?.toLocaleString()}`,
        miles: `${car.mileage} mi`,
        fuelType: car.fuelType,
        transmission: car.transmission,
        tag: car.specialOffer ? 'Sale' : '',
        tagColor: 'bg-blue-600'
    }));

    return (
        <div className="w-full bg-[#050c1f] text-white py-16 mt-16">
            <div className="container mx-auto px-4 md:px-8">

                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold">Popular Makes</h2>
                    <a href="/cars" className="flex items-center text-white hover:text-blue-300">
                        View All <HiArrowRight className="ml-2" />
                    </a>
                </div>


                <div className="flex space-x-8 mb-10 overflow-x-auto">
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


                {loading && (
                    <div className="flex justify-center my-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                    </div>
                )}


                {error && !loading && (
                    <div className="text-red-400 text-center py-8">
                        {error}
                    </div>
                )}


                {!loading && !error && (
                    <div className="relative">
                        <div
                            ref={scrollContainerRef}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
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
                                            <h3 className="font-medium text-lg text-gray-900">{car.name}</h3>
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
                                                <span className="font-bold text-lg text-gray-900">{car.price}</span>
                                                <a href={`/cars/${car.id}`} className="text-blue-500 text-sm flex items-center">
                                                    View Details <HiArrowRight className="ml-1 text-xs" />
                                                </a>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            ) : (
                                <div className="w-full py-12 text-center">
                                    <p className="text-gray-400 text-lg">No vehicles available for {activeBrand}.</p>
                                </div>
                            )}
                        </div>


                        {displayCars.length > 3 && (
                            <>
                                <div className="absolute top-[50%] -translate-y-1/2 left-2 z-10">
                                    <button
                                        onClick={() => scroll('left')}
                                        className="bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center border"
                                    >
                                        <BsArrowLeft className="text-gray-700" />
                                    </button>
                                </div>
                                <div className="absolute top-[50%] -translate-y-1/2 right-2 z-10">
                                    <button
                                        onClick={() => scroll('right')}
                                        className="bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center border"
                                    >
                                        <BsArrowRight className="text-gray-700" />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularMakes;