import React, { useState } from 'react';
import { HiArrowRight } from 'react-icons/hi';

const ShopBoxCar = () => {
    const [activeTab, setActiveTab] = useState('new');

    const tabs = [
        { id: 'new', label: 'New Cars For Sale' },
        { id: 'used', label: 'Used Cars For Sale' },
        { id: 'type', label: 'Browse By Type' },
        { id: 'brand', label: 'Browse By Brand' },
    ];

    // Car brands organized in columns for the grid layout
    const carBrands = [
        // Column 1
        ['Ford Cars', 'Honda Cars', 'Hyundai Cars', 'Infiniti Cars', 'Jaguar Cars', 'Jeep Cars'],
        // Column 2
        ['Chrysler Cars', 'Citroen Cars', 'Cupra Cars', 'Dacia Cars', 'DS Cars', 'Fiat Cars'],
        // Column 3
        ['Land Rover Cars', 'Lexus Cars', 'Mercedes-Benz Cars', 'Mazda Cars', 'MG Cars', 'Kia Cars'],
        // Column 4
        ['Abarth Cars', 'Romeo Cars', 'Audi Cars', 'Bentley Cars', 'BMW Cars', 'Chevrolet Cars'],
        // Column 5
        ['Mini Cars', 'Mitsubishi Cars', 'Nissan Cars', 'Peugeot Cars', 'Porsche Cars', 'Renault Cars'],
    ];

    return (
        <div className="w-full py-12 px-6 sm:px-10 md:px-14 lg:px-16 xl:px-24 mt-14">
            {/* Header with View More link */}
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Shop BoxCar Your Way</h2>
                <a href="#" className="flex items-center text-gray-600 hover:text-gray-900">
                    View More <HiArrowRight className="ml-1" />
                </a>
            </div>

            {/* Tab navigation */}
            <div className="flex flex-wrap border-b border-gray-200 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`mr-8 pb-4 font-medium text-sm ${activeTab === tab.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Car brands grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 gap-y-2">
                {carBrands.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-col space-y-3">
                        {column.map((brand, brandIndex) => (
                            <a
                                key={`${columnIndex}-${brandIndex}`}
                                href="#"
                                className="text-gray-600 hover:text-blue-600 text-sm"
                            >
                                {brand}
                            </a>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopBoxCar;