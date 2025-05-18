import React, { useState, useEffect } from 'react';
import { HiArrowRight } from 'react-icons/hi';
import { BsBookmark } from 'react-icons/bs';
import { IoSpeedometerOutline } from 'react-icons/io5';
import { TbManualGearbox } from 'react-icons/tb';
import { RiGasStationLine } from 'react-icons/ri';
import axios from 'axios';

const ShopBoxCar = () => {
    const [activeTab, setActiveTab] = useState('brand');
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [brands, setBrands] = useState([]);
    const [types, setTypes] = useState([]);

    const tabs = [
        { id: 'New', label: 'New Cars For Sale' },
        { id: 'Used', label: 'Used Cars For Sale' },
        { id: 'type', label: 'Browse By Type' },
        { id: 'brand', label: 'Browse By Brand' },
    ];

    useEffect(() => {
        setSelectedItem(null);
        setCars([]);
        setError(null);

        if (activeTab === 'brand') {
            // Fetch all brands
            fetchBrands();
        } else if (activeTab === 'New') {
            // Fetch brands with new cars
            fetchBrandsByCondition('New');
        } else if (activeTab === 'Used') {
            // Fetch brands with used cars
            fetchBrandsByCondition('Used');
        } else if (activeTab === 'type') {
            // Fetch vehicle types
            fetchVehicleTypes();
        }
    }, [activeTab]);

    // Fetch all brands
    const fetchBrands = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle`);
            if (response.data?.data) {
                if (response.data.data.vehclesList) {
                    // Extract unique makes from vehicles list
                    const uniqueBrands = [...new Set(response.data.data.vehclesList.map(vehicle => vehicle.make))].filter(Boolean);
                    setBrands(uniqueBrands);
                } else {
                    // Handle if data is an array of brand objects
                    const extractedBrands = Array.isArray(response.data.data) ?
                        response.data.data.map(item => typeof item === 'object' ? item.name || item.make : item).filter(Boolean) :
                        [];
                    setBrands(extractedBrands);
                }
            } else {
                setBrands([]);
            }
        } catch (err) {
            console.error('Error fetching brands:', err);
            setError('Failed to load brands');
            setBrands([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch brands filtered by condition
    const fetchBrandsByCondition = async (condition) => {
        setLoading(true);
        try {
            try {
                const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle?condition=${condition}`);
                if (response.data?.data) {
                    if (response.data.data.vehclesList) {
                        // Extract unique makes from vehicles with this condition
                        const uniqueBrands = [...new Set(response.data.data.vehclesList.map(vehicle => vehicle.make))].filter(Boolean);
                        setBrands(uniqueBrands);
                        setLoading(false);
                        return;
                    } else {
                        // Handle if data is an array of brand objects
                        const brandsList = Array.isArray(response.data.data) ?
                            response.data.data.map(item => typeof item === 'object' ? item.name || item.make : item).filter(Boolean) :
                            [];

                        // Filter brands that have cars with this condition
                        const brandsWithCars = await filterBrandsWithCars(brandsList, condition);
                        setBrands(brandsWithCars);
                        setLoading(false);
                        return;
                    }
                }
            } catch (err) {
                console.log('Error with specific endpoint, trying alternative approach');
            }

            // Fallback approach
            const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle?condition=${condition}`);
            if (response.data?.data?.vehclesList) {
                const vehicles = response.data.data.vehclesList;
                const uniqueBrands = [...new Set(vehicles.map(vehicle => vehicle.make))].filter(Boolean);
                setBrands(uniqueBrands);
            } else {
                setBrands([]);
            }
        } catch (err) {
            console.error(`Error fetching brands for ${condition} vehicles:`, err);
            setError(`Failed to load brands for ${condition.toLowerCase()} vehicles`);
            setBrands([]);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to verify each brand actually has cars with the specified condition
    const filterBrandsWithCars = async (brandsList, condition) => {
        const brandsWithCars = [];

        for (const brand of brandsList) {
            try {
                const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle?condition=${condition}&make=${encodeURIComponent(brand)}`);

                // Only include brand if it has at least one car
                if (response.data?.data?.vehclesList && response.data.data.vehclesList.length > 0) {
                    brandsWithCars.push(brand);
                }
            } catch (err) {
                console.error(`Error checking cars for brand ${brand}:`, err);
            }
        }

        return brandsWithCars;
    };

    // Fetch vehicle types
    const fetchVehicleTypes = async () => {
        setLoading(true);
        try {
            // Try to get vehicle types from a specific endpoint if available
            try {
                const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicleTypes`);
                if (response.data?.data) {
                    setTypes(response.data.data);
                    setLoading(false);
                    return;
                }
            } catch (err) {
                console.log('No specific endpoint for vehicle types, will fetch all vehicles instead');
            }

            // If no specific endpoint exists, fetch all vehicles and extract unique types
            const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle`);
            if (response.data?.data?.vehclesList) {
                const vehicles = response.data.data.vehclesList;
                // Extract unique vehicle types
                const uniqueTypes = [...new Set(vehicles.map(vehicle => vehicle.vehicleType))].filter(Boolean);
                setTypes(uniqueTypes);
            } else {
                // Fallback to static types if no data
                setTypes(['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Van']);
            }
        } catch (err) {
            console.error('Error fetching vehicle types:', err);
            setError('Failed to load vehicle types');
            // Fallback to static types
            setTypes(['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Convertible', 'Truck', 'Van']);
        } finally {
            setLoading(false);
        }
    };

    const handleItemClick = async (item) => {
        setSelectedItem(item);
        setLoading(true);
        setCars([]);
        setError(null);

        try {
            let queryParams = '';

            switch (activeTab) {
                case 'brand':
                    queryParams = `make=${encodeURIComponent(item)}`;
                    break;
                case 'type':
                    queryParams = `vehicleType=${encodeURIComponent(item)}`;
                    break;
                case 'New':
                    queryParams = `condition=New&make=${encodeURIComponent(item)}`;
                    break;
                case 'Used':
                    queryParams = `condition=Used&make=${encodeURIComponent(item)}`;
                    break;
            }

            const response = await axios.get(`https://back-end-edj4.onrender.com/api/v1/vehicle?${queryParams}`);

            if (response.data?.data?.vehclesList) {
                setCars(response.data.data.vehclesList);
            } else {
                setCars([]);
            }
        } catch (err) {
            console.error("Error fetching cars:", err);
            setError("Failed to load vehicles");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full py-12 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-24 mt-14">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Shop BoxCar Your Way</h2>
                <a href="/cars" className="flex items-center text-gray-600 hover:text-gray-900">
                    View More <HiArrowRight className="ml-1" />
                </a>
            </div>

            <div className="flex flex-wrap border-b border-gray-200 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`mr-8 pb-4 font-medium text-sm ${activeTab === tab.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>


            {(activeTab === 'New' || activeTab === 'Used' || activeTab === 'brand') && (
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3 mb-6">
                        {brands.map((brand, index) => {
                            // Ensure brand is a string
                            const brandName = typeof brand === 'object' ? (brand.name || brand.make || '') : brand;
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleItemClick(brandName)}
                                    className={`px-4 py-2 rounded-md ${selectedItem === brandName ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
                                >
                                    {brandName}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}


            {activeTab === 'type' && (
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3 mb-6">
                        {types.map((type, index) => (
                            <button
                                key={index}
                                onClick={() => handleItemClick(type)}
                                className={`px-4 py-2 rounded-md ${selectedItem === type ? 'bg-blue-100 text-blue-600 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>
            )}


            {loading && (
                <div className="flex justify-center my-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}


            {error && !loading && (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-8">
                    {error}
                </div>
            )}


            {!loading && !error && selectedItem && cars.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {cars.map(car => (
                        <div key={car._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="relative h-48">
                                <img
                                    src={car.mainImage || (car.images && car.images[0])}
                                    alt={`${car.make} ${car.model}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.src = '/background2.jpg';
                                    }}
                                />
                                {car.specialOffer && (
                                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                                        Sale
                                    </span>
                                )}
                                <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm">
                                    <BsBookmark className="text-gray-600" />
                                </button>
                            </div>

                            <div className="p-4">
                                <h3 className="font-medium text-lg mb-1">
                                    {car.make} {car.model} {car.year}
                                </h3>
                                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                                    {car.description}
                                </p>

                                <div className="flex justify-between mb-3">
                                    <div className="flex items-center">
                                        <IoSpeedometerOutline className="text-gray-500 mr-1" />
                                        <span className="text-sm text-gray-500">{car.mileage} mi</span>
                                    </div>
                                    <div className="flex items-center">
                                        <RiGasStationLine className="text-gray-500 mr-1" />
                                        <span className="text-sm text-gray-500">{car.fuelType}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <TbManualGearbox className="text-gray-500 mr-1" />
                                        <span className="text-sm text-gray-500">{car.transmission}</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                    <span className="font-bold text-lg">${car.price?.toLocaleString()}</span>
                                    <a
                                        href={`/cars/${car._id}`}
                                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                                    >
                                        View Details <HiArrowRight className="ml-1" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {!loading && !error && selectedItem && cars.length === 0 && (
                <div className="text-center py-16 bg-gray-50 rounded-lg">
                    <p className="text-gray-500 text-lg">No vehicles found</p>
                    <p className="text-gray-400 mt-1">Try a different selection</p>
                </div>
            )}
        </div>
    );
};

export default ShopBoxCar;