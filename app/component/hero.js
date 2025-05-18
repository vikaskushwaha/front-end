'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaCar } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdDirectionsCar } from 'react-icons/md';
import { HiMenu, HiX } from 'react-icons/hi';
import CarDropdown from './CarDropdown';
import axios from 'axios';
import { fetchCarMakes } from '../action/fetchanymake';
import { fetchCarModels } from '../action/fetchmodelForSelectedMake';
import { searchVehicles } from '../action/fetchSerachCar';

import { useSearch } from '../context/SearchContext';
export const BDXCarsHeader = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [makes, setMakes] = useState([]);
    const [selectedMake, setSelectedMake] = useState('');
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    // const [searchResults, setSearchResults] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const {
        setSearchResults,
    } = useSearch();
    useEffect(() => {
        const getMakes = async () => {
            const makesData = await fetchCarMakes();
            setMakes(makesData)
        };

        getMakes();
    }, []);


    useEffect(() => {
        const getModelFormake = async () => {
            if (selectedMake) {
                const modelData = await fetchCarModels(selectedMake)
                setModels(modelData)
            }
        }
        getModelFormake();
    }, [selectedMake])
    console.log(models);

    // Enhanced search handler
    const handleSearch = async () => {
        // Reset states
        setSearchError(null);
        setIsSearching(true);

        try {

            if (!selectedMake && !selectedModel && !selectedPrice) {
                console.log("Please select at least one search criteria");
                setSearchError("Please select at least one search criteria");
                return false; // Return false to indicate search didn't proceed
            }

            console.log(`Searching for: Make: ${selectedMake || 'Any'}, Model: ${selectedModel || 'Any'}, Price: ${selectedPrice || 'Any'}`);


            const results = await searchVehicles(
                selectedMake || '',
                selectedModel || '',
                selectedPrice || ''
            );

            if (results.error) {
                throw new Error(results.error);
            }

            setSearchResults(results);



            if (results.length === 0) {
                console.log("No vehicles found matching your criteria");
                setSearchError("No vehicles found matching your criteria");
                return false;
            } else {
                console.log(`Found ${results.length} vehicles matching your criteria`);


                return true;
            }
        } catch (error) {
            console.error("Search failed:", error);
            setSearchError(error.message || "Something went wrong with the search");
            return false;
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <div
            className="relative min-h-screen w-full bg-cover bg-center"
            style={{ backgroundImage: "url('/background2.jpg')" }}
        >
            {/* Navigation */}
            <div className="w-full px-4 sm:px-6 md:px-12 py-4 md:py-6">
                <div className="flex items-center justify-between">
                    <div className="text-white text-xl sm:text-2xl font-bold tracking-wider">BOXCARS</div>
                    <div className="lg:hidden">
                        <button className="text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                            {mobileMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
                        </button>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 text-white">
                        {['Home', 'Listings', 'Blog', 'Pages'].map((item, index) => (
                            <div key={index} className="flex items-center cursor-pointer hover:text-gray-200 transition">
                                {item} <IoIosArrowDown className="ml-1" />
                            </div>
                        ))}
                        <div className="cursor-pointer hover:text-gray-200 transition">About</div>
                        <div className="cursor-pointer hover:text-gray-200 transition">Contact</div>
                    </div>
                    <div className="hidden sm:flex items-center space-x-4">
                        <button className="text-white flex items-center hover:text-gray-200 transition">
                            <BsFillPersonFill className="mr-1" /> Sign in
                        </button>
                        <button className="bg-white text-gray-800 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-medium hover:bg-gray-100 transition">
                            Submit Listing
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mt-4 bg-gray-900 bg-opacity-90 p-4 absolute left-0 right-0 z-50">
                        <div className="flex flex-col space-y-3 text-white">
                            {['Home', 'Listings', 'Blog', 'Pages', 'About', 'Contact'].map((item, index) => (
                                <div key={index} className="flex items-center justify-between cursor-pointer py-2 border-b border-gray-700">
                                    {item} {index < 4 && <IoIosArrowDown className="ml-1" />}
                                </div>
                            ))}
                            <div className="sm:hidden flex items-center justify-between py-2">
                                <button className="text-white flex items-center">
                                    <BsFillPersonFill className="mr-1" /> Sign in
                                </button>
                                <button className="bg-white text-gray-800 px-3 py-1.5 rounded-full text-sm font-medium">
                                    Submit Listing
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center text-center text-white mt-12 sm:mt-16 md:mt-20 px-4">
                <p className="text-sm md:text-base">Find cars for sale and for rent near you</p>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-3 mb-6 sm:mb-8">
                    Find Your Perfect Car
                </h1>

                {/* Filter Tabs */}
                <div className="flex space-x-6 sm:space-x-8 mb-6 overflow-x-auto pb-2 w-full justify-center">
                    {['All', 'New', 'Used'].map((tab, i) => (
                        <button
                            key={i}
                            className={`text-white ${i === 0 ? 'border-b-2 border-white pb-1 font-medium' : 'opacity-80 hover:opacity-100'} whitespace-nowrap`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-4xl bg-white md:rounded-full flex flex-col md:flex-row overflow-hidden shadow-lg">
                    <div className="flex flex-col md:flex-row flex-grow">
                        {/* Makes Dropdown with ShadCN */}
                        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                            <CarDropdown
                                options={makes}
                                value={selectedMake}
                                onChange={setSelectedMake}
                                placeholder="Any Makes"
                                width="w-72"
                            />
                        </div>

                        {/* Model Selector */}
                        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-200">
                            <CarDropdown
                                options={models || []}
                                value={selectedModel}
                                onChange={setSelectedModel}
                                placeholder="Any Models"
                                disabled={!selectedMake}
                            />
                        </div>

                        {/* Price Selector */}
                        <div className="flex-1">
                            <CarDropdown
                                options={["$0-$10,000", "$10,000-$20,000", "$20,000-$50,000", "$50,000+"]}
                                value={selectedPrice}
                                onChange={setSelectedPrice}
                                placeholder="All Prices"
                            />
                        </div>
                    </div>

                    {/* Search Button */}
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-3 flex items-center justify-center transition w-full md:w-48 text-sm sm:text-base"
                        onClick={async () => {
                            const searchSuccessful = await handleSearch();

                            if (searchSuccessful) {
                                // Wait a moment to ensure DOM is fully updated
                                setTimeout(() => {
                                    // Find the explore cars element
                                    const exploreElement = document.getElementById('explore-cars');

                                    // Debug log to verify element is found
                                    console.log("Found explore-cars element:", exploreElement);

                                    if (exploreElement) {
                                        // Scroll to it
                                        exploreElement.scrollIntoView({
                                            behavior: 'smooth',
                                            block: 'start'
                                        });
                                    }
                                }, 100); // Short delay to ensure rendering is complete
                            }
                        }}
                        disabled={isSearching}
                    >
                        {isSearching ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Searching...
                            </div>
                        ) : (
                            <>
                                <FaSearch className="mr-2" /> Search Cars
                            </>
                        )}
                    </button>
                </div>

                {/* Browse Models */}
                <div className="mt-8">
                    <p className="text-white mb-4 text-sm sm:text-base">Or Browse Featured Model</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
                        {['SUV', 'Sedan', 'Hatchback', 'Coupe', 'Hybrid'].map((model, i) => {
                            const Icon = i % 2 === 0 ? FaCar : MdDirectionsCar;
                            return (
                                <button
                                    key={model}
                                    className="bg-gray-800 bg-opacity-70 text-white md:rounded-full px-4 sm:px-6 py-2 flex items-center text-xs sm:text-sm hover:bg-opacity-90 transition"
                                >
                                    <Icon className="mr-1 sm:mr-2" /> {model}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};