import React from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import Image from 'next/image';

const Premiumbrands = () => {
    const carBrands = [
        { name: 'Audi', logo: '/logo/audi.svg' },
        { name: 'BMW', logo: '/logo/bmw.svg' },
        { name: 'Ford', logo: '/logo/ford.svg' },
        { name: 'Mercedes Benz', logo: '/logo/mercedes.svg' },
        { name: 'Peugeot', logo: '/logo/peugot.svg' },
        { name: 'Volkswagen', logo: '/logo/volks.svg' },
    ];

    return (
        <div className="rounded-t-3xl px-9 lg:px-12 py-8 bg-[#F9FBFC]">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Explore Our Premium Brands</h2>
                <a href="#" className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                    Show All Brands
                    <HiArrowNarrowRight className="ml-2" />
                </a>
            </div>

            {/* Brand logos grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {carBrands.map((brand, index) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow">
                        <div className="h-16 flex items-center justify-center">
                            <Image
                                src={brand.logo}
                                alt={`${brand.name} logo`}
                                width={70}
                                height={70}
                                className="object-contain"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Premiumbrands;